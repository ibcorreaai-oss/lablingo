import { LabExplanation } from "./types";

export const SAMPLE_REPORT = `Complete Blood Count (CBC)
Hemoglobin: 10.8 g/dL (Reference: 12.0-15.5 g/dL)
White Blood Cell Count: 11.8 x10^9/L (Reference: 4.5-11.0 x10^9/L)
Platelet Count: 250 x10^9/L (Reference: 150-450 x10^9/L)
Fasting Glucose: 108 mg/dL (Reference: 70-99 mg/dL)
Total Cholesterol: 215 mg/dL (Reference: <200 mg/dL)
LDL Cholesterol: 145 mg/dL (Reference: <100 mg/dL)
TSH: 2.1 mIU/L (Reference: 0.4-4.0 mIU/L)`;

export const DEMO_EXPLANATION: LabExplanation = {
  isDemo: true,
  summary:
    "Overall, most of your results are close to typical, with a few values worth discussing with your doctor: your red blood cell count is a little low, your white blood cell count and blood sugar are slightly above the usual range, and your cholesterol is a bit high. None of this means something is definitely wrong — it just points to a few topics for your next appointment.",
  markers: [
    {
      name: "Hemoglobin",
      value: "10.8 g/dL",
      referenceRange: "12.0-15.5 g/dL",
      status: "low",
      explanation:
        "Hemoglobin is the part of your blood that carries oxygen. A lower number can be a sign of mild anemia, which is common and often easy to manage once the cause is found (for example, low iron).",
    },
    {
      name: "White Blood Cell Count",
      value: "11.8 x10^9/L",
      referenceRange: "4.5-11.0 x10^9/L",
      status: "high",
      explanation:
        "White blood cells help your body fight infection. A slightly high count often just means your body was recently fighting off a cold or minor infection.",
    },
    {
      name: "Platelet Count",
      value: "250 x10^9/L",
      referenceRange: "150-450 x10^9/L",
      status: "normal",
      explanation:
        "Platelets help your blood clot. This number is right in the middle of the typical range — nothing to worry about here.",
    },
    {
      name: "Fasting Glucose",
      value: "108 mg/dL",
      referenceRange: "70-99 mg/dL",
      status: "high",
      explanation:
        "This measures your blood sugar after not eating for several hours. A slightly elevated result is sometimes called 'pre-diabetes range' and is worth tracking with diet and follow-up tests.",
    },
    {
      name: "Total Cholesterol",
      value: "215 mg/dL",
      referenceRange: "<200 mg/dL",
      status: "high",
      explanation:
        "Cholesterol is a fatty substance in your blood. A slightly high total number is common and often improved with diet, exercise, and follow-up monitoring.",
    },
    {
      name: "LDL Cholesterol",
      value: "145 mg/dL",
      referenceRange: "<100 mg/dL",
      status: "high",
      explanation:
        "This is often called 'bad cholesterol.' Higher levels over time are linked to heart health, so this is a good one to bring up with your doctor.",
    },
    {
      name: "TSH",
      value: "2.1 mIU/L",
      referenceRange: "0.4-4.0 mIU/L",
      status: "normal",
      explanation:
        "TSH checks how your thyroid (a gland that controls metabolism) is working. This result is right in the typical range.",
    },
  ],
  questionsForDoctor: [
    "My hemoglobin is a little low — should I get my iron levels checked?",
    "My fasting glucose and cholesterol are slightly high — are there diet or lifestyle changes you'd recommend before the next test?",
    "Is my white blood cell count something to recheck later, or is it likely just from a recent illness?",
  ],
  disclaimer:
    "This is a plain-language summary, not a medical diagnosis. Always talk to a licensed doctor about your real results — they know your full health history and can interpret these numbers correctly.",
};
