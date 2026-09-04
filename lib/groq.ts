import Groq from "groq-sdk";
import { LabExplanation, ReadingLevel } from "./types";

const READING_LEVEL_INSTRUCTIONS: Record<ReadingLevel, string> = {
  simple:
    "Write for someone with a 5th-grade reading level. Use short sentences and everyday words. Avoid all medical jargon.",
  standard:
    "Write for a general adult audience with no medical background. Use plain, everyday language and briefly define any medical term you must use.",
  detailed:
    "Write for someone who wants a bit more depth. You may use common medical terms, but always explain them in plain language the first time.",
};

const SYSTEM_PROMPT = `You are LabLingo, an assistant that translates lab test reports into plain, friendly, non-alarming language for patients.

Rules you must always follow:
- NEVER provide a diagnosis or tell the patient what disease they have.
- NEVER tell the patient to change medication or dosage.
- ALWAYS remind the patient this is not medical advice and to talk to a licensed doctor.
- Use a calm, encouraging tone. Do not cause panic, even if a value is out of range.
- If the reference range is given in the report, use it to decide if a marker is "normal", "high", or "low". If no range is given or you are unsure, use "unknown".
- Base your explanation only on general, widely-known health education facts about what each marker measures. Do not invent specific causes for this specific patient.
- Also write a short "reassurance" note (2-4 sentences) that gently acknowledges it's completely normal to feel anxious while waiting for or reading lab results, and puts the overall picture in honest emotional context. Never use false reassurance — if several markers are out of range, say so plainly, calmly, and without minimizing.
- Set "seekCareSoon" to true ONLY if the overall pattern of results genuinely suggests the patient should reach out to a doctor without waiting for a routine follow-up (e.g. a marker far outside its range, or a combination that's clinically worth flagging). Set it to false for normal results or results that are only mildly outside range. This is not a diagnosis or an emergency alert — just an honest signal of urgency, used to avoid both false alarm and false calm.
- Respond with ONLY valid JSON, no markdown fences, no extra commentary, matching exactly this shape:
{
  "summary": string,
  "markers": [
    { "name": string, "value": string, "referenceRange": string | null, "status": "normal" | "high" | "low" | "unknown", "explanation": string }
  ],
  "questionsForDoctor": [string, string, string],
  "disclaimer": string,
  "reassurance": string,
  "seekCareSoon": boolean
}`;

function extractJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    // fall through
  }
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model response");
  }
  const slice = raw.slice(start, end + 1);
  try {
    return JSON.parse(slice);
  } catch {
    // last resort: strip trailing commas before } or ]
    const cleaned = slice.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(cleaned);
  }
}

function normalize(parsed: any): LabExplanation {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Malformed explanation payload");
  }
  const markers = Array.isArray(parsed.markers) ? parsed.markers : [];
  return {
    summary: String(parsed.summary ?? "").trim() || "We couldn't summarize this report — please try again.",
    markers: markers.map((m: any) => ({
      name: String(m?.name ?? "Unknown marker"),
      value: String(m?.value ?? ""),
      referenceRange: m?.referenceRange ? String(m.referenceRange) : undefined,
      status: ["normal", "high", "low", "unknown"].includes(m?.status) ? m.status : "unknown",
      explanation: String(m?.explanation ?? ""),
    })),
    questionsForDoctor: Array.isArray(parsed.questionsForDoctor)
      ? parsed.questionsForDoctor.map((q: any) => String(q))
      : [],
    disclaimer:
      String(parsed.disclaimer ?? "").trim() ||
      "This is a plain-language summary, not a medical diagnosis. Always talk to a licensed doctor about your real results.",
    reassurance:
      String(parsed.reassurance ?? "").trim() ||
      "It's completely normal to feel a little anxious reading lab results. Take your time going through this, and remember a licensed doctor is the right person to interpret what it means for you.",
    seekCareSoon: Boolean(parsed.seekCareSoon),
  };
}

export async function explainLabReport(
  reportText: string,
  readingLevel: ReadingLevel
): Promise<LabExplanation> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY_MISSING");
  }

  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0.3,
    max_tokens: 2000,
    reasoning_effort: "low",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${READING_LEVEL_INSTRUCTIONS[readingLevel]}\n\nHere is the lab report to explain:\n\n${reportText}`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "";
  const parsed = extractJson(raw);
  return normalize(parsed);
}
