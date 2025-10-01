import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from "pdf-parse";
// import { dbConnect } from "@/lib/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    // Expecting multipart/form-data with a PDF file
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from PDF
    const pdfData = await pdf(buffer);
    const resumeText = pdfData.text;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an AI that extracts structured information from resumes.
      Extract the following fields in JSON format:
      {
        "name": string,
        "about": string,
        "skills": [string],
        "experience": [string],
        "education": [string],
        "projects": [string],
        "socialLinks": {
          "github": string | null,
          "linkedin": string | null,
          "twitter": string | null,
          "portfolio": string | null
        }
      }

      Resume:
      ${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsedJson;
    try {
      parsedJson = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response", raw: text }, { status: 500 });
    }

    return NextResponse.json(parsedJson);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
