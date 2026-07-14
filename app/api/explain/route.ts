import { NextRequest, NextResponse } from "next/server";
import { explainLabReport } from "@/lib/groq";
import { DEMO_EXPLANATION } from "@/lib/demo-data";
import { ExplainRequestBody } from "@/lib/types";

export const runtime = "nodejs";

const MAX_REPORT_LENGTH = 8000;

export async function POST(req: NextRequest) {
  let body: ExplainRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const reportText = (body.reportText ?? "").trim();
  const readingLevel = body.readingLevel ?? "standard";

  if (!reportText) {
    return NextResponse.json({ error: "Please paste or upload a lab report first." }, { status: 400 });
  }
  if (reportText.length > MAX_REPORT_LENGTH) {
    return NextResponse.json(
      { error: `That report is too long (max ${MAX_REPORT_LENGTH} characters). Try trimming it down.` },
      { status: 400 }
    );
  }

  try {
    const explanation = await explainLabReport(reportText, readingLevel);
    return NextResponse.json(explanation);
  } catch (err: any) {
    if (err?.message === "GROQ_API_KEY_MISSING") {
      return NextResponse.json(DEMO_EXPLANATION);
    }
    console.error("explain route error", err);
    return NextResponse.json(
      { error: "The AI had trouble reading that report. Please try again in a moment." },
      { status: 502 }
    );
  }
}
