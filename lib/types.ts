export type ReadingLevel = "simple" | "standard" | "detailed";

export type MarkerStatus = "normal" | "high" | "low" | "unknown";

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
  isDemo?: boolean;
}

export interface ExplainRequestBody {
  reportText: string;
  readingLevel: ReadingLevel;
}
