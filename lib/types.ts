export type ReadingLevel = "simple" | "standard" | "detailed";

export type MarkerStatus = "normal" | "high" | "low" | "unknown";

export type EmotionalState = "worried" | "unsure" | "calm";

export interface LabMarker {
  name: string;
  value: string;
  referenceRange?: string;
  status: MarkerStatus;
  explanation: string;
}

export interface LabExplanation {
  summary: string;
  markers: LabMarker[];
  questionsForDoctor: string[];
  disclaimer: string;
  /** Short, honest, non-alarmist note addressing how it's normal to feel anxious about lab results. */
  reassurance: string;
  /** True only when the AI judges the results genuinely warrant contacting a doctor without waiting for a routine follow-up. */
  seekCareSoon: boolean;
  isDemo?: boolean;
}

export interface ExplainRequestBody {
  reportText: string;
  readingLevel: ReadingLevel;
}
