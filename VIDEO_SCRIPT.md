# Demo video script — LabLingo (target: 90-120 seconds)

Rules requirement: 2–5 min demo video, screen recording or live demo, showing the project working.
This script is written so it can be recorded as a **silent screen capture** (no narration needed)
using on-screen captions, or narrated live by Igor reading the "Narration" lines. Either works.

Suggested tool: Windows built-in Xbox Game Bar (`Win+G` → record) or OBS Studio, recording the
browser window at the deployed URL (or `localhost:3000` while running `npm run dev`).

---

### Scene 1 — Hook (0:00–0:10)
**Screen:** LabLingo homepage, empty state.
**Caption / narration:** "You just got your lab results back. Hemoglobin, TSH, LDL... what does
any of this actually mean? LabLingo tells you — in plain English, in seconds."

### Scene 2 — Load a sample (0:10–0:20)
**Action:** Click "✨ Try a sample report" — textarea fills with a real-looking CBC + metabolic
panel.
**Caption:** "Paste your own report, or try a sample."

### Scene 3 — Pick a reading level (0:20–0:30)
**Action:** Click through the Simple / Standard / Detailed toggle.
**Caption:** "Choose how simple you want it."

### Scene 4 — Explain (0:30–0:45)
**Action:** Click "Explain My Results", show the loading state briefly.
**Caption:** "One click. A few seconds."

### Scene 5 — Results walkthrough (0:45–1:15)
**Action:** Scroll through the summary, then the color-coded marker cards (point out one
"normal", one "high", one "low"), then the "Questions to ask your doctor" box.
**Caption / narration:** "A plain-language summary. Every marker explained — what it measures,
whether it's typical, and why. Plus real questions to bring to your next appointment."

### Scene 6 — Accessibility touch (1:15–1:25)
**Action:** Click "🔊 Read aloud", let it speak a sentence or two of the summary.
**Caption:** "Built-in read-aloud for accessibility — zero extra cost, runs right in the browser."

### Scene 7 — Upload a PDF (1:25–1:40) — optional if time allows
**Action:** Upload a sample lab PDF, show it auto-filling the textarea.
**Caption:** "Or just upload the PDF straight from your patient portal."

### Scene 8 — Close (1:40–1:50)
**Screen:** Back to the top of the page, disclaimer visible.
**Caption / narration:** "LabLingo never diagnoses — it translates. Always talk to a real doctor.
Built for Next Byte Hacks V3."

---

## After recording
1. Trim to under 3 minutes (rules cap is 2–5 min; shorter and tighter reads better to judges).
2. Upload to YouTube (unlisted is fine, must be publicly viewable) or Vimeo.
3. Paste the video link into the Devpost submission form and into `DEVPOST_SUBMISSION.md`.
