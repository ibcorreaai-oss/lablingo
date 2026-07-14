import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPdf } from "@/lib/pdf";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No PDF file received." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "PDF is too large (max 10MB)." }, { status: 400 });
  }

  try {
    const buffer = await file.arrayBuffer();
    const text = await extractTextFromPdf(buffer);
    if (!text) {
      return NextResponse.json(
        { error: "Couldn't find readable text in that PDF (it may be a scanned image)." },
        { status: 422 }
      );
    }
    return NextResponse.json({ text });
  } catch (err) {
    console.error("extract-pdf route error", err);
    return NextResponse.json({ error: "Failed to read that PDF file." }, { status: 500 });
  }
}
