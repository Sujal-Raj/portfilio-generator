import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UserModel from "@/models/user.model";
import PortfolioModel from "@/models/portfolio.model";
import { dbConnect } from "@/lib/db";
// or "gemini-2.5-flash" depending on availability


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();


    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const currentUser = formData.get("currentUser") as string | null;
    
    if (!file) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }
    
    // Convert PDF to Uint8Array (Gemini accepts binary input)
    const bytes = new Uint8Array(await file.arrayBuffer());
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    `;

    // Send both prompt + file content
    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          data: Buffer.from(bytes).toString("base64"),
          mimeType: "application/pdf",
        },
      },
    ]);
    // console.log("result:", result)

    let text = result.response.text();
    // console.log("test:",text)

    text = text.replace(/```json|```/g, "").trim();
    let parsedJson;
    try {
      parsedJson = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: text },
        { status: 500 }
      );
    }

    const user = await UserModel.findOne({ email: currentUser });

    if (!user) {
      return NextResponse.json({
        message: "User Not found"
      }, {
        status: 404
      });
    }

    const portfolio = new PortfolioModel({
      userEmail: currentUser,
      ...parsedJson,
    });

    await portfolio.save();

    user.portfolio = portfolio._id;
    await user.save();
    

    return NextResponse.json({
      message: "Portfolio saved successfully",
      portfolio,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
