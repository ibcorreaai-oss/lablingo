import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LabLingo — Plain-language lab result explainer",
  description:
    "Paste or upload any lab test report and get a friendly, plain-language explanation in seconds. Free, AI-powered, not a substitute for medical advice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
