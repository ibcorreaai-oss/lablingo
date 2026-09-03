"use client";

import { useRef, useState } from "react";
import { SAMPLE_REPORT } from "@/lib/demo-data";
import { EmotionalState, LabExplanation, MarkerStatus, ReadingLevel } from "@/lib/types";
import { EmotionalCheckIn } from "@/components/EmotionalCheckIn";
import { CalmMode } from "@/components/CalmMode";

const STATUS_STYLES: Record<MarkerStatus, string> = {
  normal: "border-green-500 bg-green-50",
  high: "border-red-500 bg-red-50",
  low: "border-blue-500 bg-blue-50",
  unknown: "border-slate-300 bg-slate-50",
};

const STATUS_BADGE: Record<MarkerStatus, string> = {
  normal: "bg-green-100 text-green-800",
  high: "bg-red-100 text-red-800",
  low: "bg-blue-100 text-blue-800",
  unknown: "bg-slate-200 text-slate-700",
};

const READING_LEVELS: { value: ReadingLevel; label: string }[] = [
  { value: "simple", label: "Simple" },
  { value: "standard", label: "Standard" },
  { value: "detailed", label: "Detailed" },
];

export default function Home() {
  const [reportText, setReportText] = useState("");
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>("standard");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LabExplanation | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [feeling, setFeeling] = useState<EmotionalState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleExplain() {
    if (!reportText.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportText, readingLevel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setResult(data);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/extract-pdf", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't read that PDF.");
        return;
      }
      setReportText(data.text);
    } catch {
      setError("Couldn't upload that file. Try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleLoadSample() {
    setReportText(SAMPLE_REPORT);
    setError(null);
    setResult(null);
  }

  function handleReadAloud() {
    if (!result || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(result.summary);
    utterance.rate = 0.95;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <header className="mb-8 text-center">
        <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
            🩺 AI-powered · Free · Not medical advice
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            🔒 Analyzed in memory, never stored
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">LabLingo</h1>
        <p className="mt-2 text-slate-600">
          Turn confusing lab test results into plain language anyone can understand.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <label htmlFor="report" className="mb-2 block text-sm font-medium text-slate-700">
          Paste your lab report, or upload a PDF
        </label>
        <textarea
          id="report"
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          rows={9}
          placeholder="Example: Hemoglobin: 10.8 g/dL (Reference: 12.0-15.5 g/dL)..."
          className="w-full resize-none rounded-xl border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {uploading ? "Reading PDF…" : "📄 Upload PDF"}
          </button>
          <button
            type="button"
            onClick={handleLoadSample}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ✨ Try a sample report
          </button>

          <div className="ml-auto flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {READING_LEVELS.map((lvl) => (
              <button
                key={lvl.value}
                type="button"
                onClick={() => setReadingLevel(lvl.value)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  readingLevel === lvl.value
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleExplain}
          disabled={!reportText.trim() || loading}
          className="mt-4 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Explaining your results…" : "Explain My Results"}
        </button>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <EmotionalCheckIn value={feeling} onChange={setFeeling} />
      </section>

      {result && (
        <section className="mt-6 space-y-4">
          {(feeling === "worried" || result.seekCareSoon) && (
            <CalmMode reassurance={result.reassurance} seekCareSoon={result.seekCareSoon} />
          )}

          {result.isDemo && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Demo mode:</strong> showing a sample explanation. Add a free{" "}
              <a
                href="https://console.groq.com"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Groq API key
              </a>{" "}
              (<code>GROQ_API_KEY</code>) to enable live AI analysis for any report.
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
              <button
                type="button"
                onClick={handleReadAloud}
                className="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                {isReading ? "⏹ Stop" : "🔊 Read aloud"}
              </button>
            </div>
            <p className="mt-2 text-slate-700">{result.summary}</p>
            {feeling !== "worried" && !result.seekCareSoon && (
              <p className="mt-3 border-t border-slate-100 pt-3 text-sm italic text-slate-500">
                {result.reassurance}
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {result.markers.map((marker, i) => (
              <div
                key={i}
                className={`rounded-xl border-l-4 p-4 shadow-sm ${STATUS_STYLES[marker.status]}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-900">{marker.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[marker.status]}`}
                  >
                    {marker.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {marker.value}
                  {marker.referenceRange ? ` · normal range: ${marker.referenceRange}` : ""}
                </p>
                <p className="mt-2 text-sm text-slate-700">{marker.explanation}</p>
              </div>
            ))}
          </div>

          {result.questionsForDoctor.length > 0 && (
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <h3 className="font-semibold text-brand-900">Questions to ask your doctor</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-brand-900/90">
                {result.questionsForDoctor.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-center text-xs italic text-slate-500">{result.disclaimer}</p>
        </section>
      )}

      <footer className="mt-12 text-center text-xs text-slate-400">
        Built for Next Byte Hacks V3 · Not a substitute for professional medical advice
      </footer>
    </main>
  );
}
