# 🩺 LabLingo

**Turn confusing lab test results into plain language anyone can understand.**

Built for [Next Byte Hacks V3](https://next-byte-hacks-v3.devpost.com/) (Devpost).

**Live demo:** https://lablingo.vercel.app · **Repo:** https://github.com/ibcorreaai-oss/lablingo

## The problem

Millions of people get a lab report back — blood work, cholesterol panel, thyroid test — full of
abbreviations, units, and reference ranges, and no idea what any of it actually means until their
next doctor's appointment, which might be weeks away. That gap causes real anxiety, and it
disproportionately hurts people with lower health literacy, English-language learners, and anyone
without a doctor on speed dial to just ask.

LabLingo closes that gap in under 10 seconds: paste your report (or upload the PDF), pick how
simple you want the language, and get a plain-English explanation of every marker — what it
measures, whether it's in the typical range, and three good questions to bring to your doctor.
It never diagnoses and always tells you to talk to a real doctor — it's a translator, not a
replacement for one.

## Features

- **Paste or upload** — paste report text directly, or upload a PDF and we extract the text for you.
- **Three reading levels** — Simple (5th-grade), Standard (general adult), Detailed (a bit more depth).
- **Plain-language marker cards** — each test result gets a color-coded card (normal / high / low)
  with a jargon-free explanation.
- **Questions to ask your doctor** — three tailored follow-up questions generated from your actual
  results.
- **Read aloud** — one click uses your browser's built-in text-to-speech to read the summary out
  loud, for accessibility and low-literacy support.
- **Try a sample report** — one-click demo data so anyone (including judges) can try it instantly
  without needing a real lab report on hand.
- **Works without an API key** — ships with a "demo mode" that shows a realistic sample
  explanation if no AI key is configured, so the live demo always works for visitors.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Groq** (`llama-3.3-70b-versatile`) for the AI explanation — free tier, OpenAI-compatible API,
  no cost to run
- **unpdf** for serverless PDF text extraction
- Browser-native **Web Speech API** for read-aloud (zero cost, zero dependencies)
- Deployed on **Vercel**

No database, no accounts, no tracking — paste, get an answer, done. That's also what makes it
trivially easy for anyone (including hackathon judges) to test in a few seconds.

## Running it locally

```bash
npm install
cp .env.example .env.local
# add your free Groq key to .env.local (get one at https://console.groq.com — no card required)
npm run dev
```

Without a `GROQ_API_KEY`, the app still runs and shows a labeled "demo mode" sample explanation
so the UI/UX is fully explorable even without a key.

## Safety & disclaimers

LabLingo is an educational language tool, **not a diagnostic tool**. The system prompt explicitly
forbids diagnosing conditions or suggesting medication changes, and every response ends with a
reminder to consult a licensed doctor. Status classification (normal/high/low) only uses the
reference range printed on the report itself — it never invents thresholds.

## What we learned

Building a "translate jargon into plain language" tool surfaced how much of the real design work
is in the *prompt constraints*, not the UI: getting a small, fast model to reliably return
strict JSON, stay calm/non-alarming in tone, and refuse to diagnose took more iteration than the
frontend did.

## What's next

- Multi-language output (Spanish, Portuguese) for non-English speakers
- Support for more report types (urinalysis, lipid panels with more nuance, imaging reports)
- Trend view: paste two reports from different dates and see what changed, in plain language
- Optional PDF export of the plain-language summary to bring to an appointment

## License

MIT — see [LICENSE](./LICENSE).
