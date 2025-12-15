import PortfolioModel from "@/models/portfolio.model";
import { NextRequest, NextResponse } from "next/server";
import {dbConnect} from "@/lib/db"; // if you use one

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    // Check if portfolio already exists
    const existingPortfolio = await PortfolioModel.findOne({ slug });

    if (existingPortfolio) {
      return NextResponse.json(
        {
          message: "Portfolio found",
          slug: existingPortfolio.slug,
          portfolio: existingPortfolio,
        },
        { status: 200 }
      );
    }

    // Create new portfolio
    const newPortfolio = await PortfolioModel.create(body);

    return NextResponse.json(
      {
        message: "Portfolio created",
        slug: newPortfolio.slug,
        portfolio: newPortfolio,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
