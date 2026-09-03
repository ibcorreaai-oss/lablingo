"use client";

import { EmotionalState } from "@/lib/types";

const OPTIONS: { value: EmotionalState; emoji: string; label: string }[] = [
  { value: "worried", emoji: "😟", label: "Anxious" },
  { value: "unsure", emoji: "😐", label: "Not sure" },
  { value: "calm", emoji: "🙂", label: "Calm" },
];

export function EmotionalCheckIn({
  value,
  onChange,
}: {
  value: EmotionalState | null;
  onChange: (v: EmotionalState) => void;
}) {
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-sm font-medium text-slate-700">
        Optional — how are you feeling about waiting for these results?
      </p>
      <p className="mt-0.5 text-xs text-slate-500">
        This stays on your device. It's only used to soften how we show your results — nothing is sent anywhere or saved.
      </p>
      <div className="mt-2 flex gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              value === opt.value
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span aria-hidden="true">{opt.emoji}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
