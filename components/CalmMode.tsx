"use client";

import { useEffect, useState } from "react";

const CYCLE_MS = 8000;

function BreathingPacer() {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p === "in" ? "out" : "in"));
    }, CYCLE_MS / 2);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="breathe-circle flex h-20 w-20 items-center justify-center rounded-full bg-brand-200/70">
        <div className="h-10 w-10 rounded-full bg-brand-500/80" />
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
        Breathe {phase === "in" ? "in" : "out"} slowly…
      </p>
    </div>
  );
}

export function CalmMode({
  reassurance,
  seekCareSoon,
}: {
  reassurance: string;
  seekCareSoon: boolean;
}) {
  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-brand-900">A moment before the details</h3>
      <BreathingPacer />
      <p className="text-sm text-brand-900/90">{reassurance}</p>
      {seekCareSoon && (
        <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <strong>Worth acting on:</strong> based on this report, it's a good idea to reach out to
          your doctor soon rather than waiting for your next routine visit — not an emergency, just
          something not to put off.
        </div>
      )}
    </div>
  );
}
