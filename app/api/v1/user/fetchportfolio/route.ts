// import PortfolioModel from "@/models/portfolio.model";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { e: email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { message: "Email not provided in request body" },
//         { status: 400 }
//       );
//     }

//     const portfolio = await PortfolioModel.findOne({ userEmail: email });

//     return NextResponse.json(
//       {
//         message: "Portfolio fetched successfully",
//         portfolio,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching portfolio:", error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }


// app/api/portfolio/[slug]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import PortfolioModel from "@/models/portfolio.model";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Validate slug param
    if (!params?.slug || typeof params.slug !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find portfolio by slug
    const portfolio = await PortfolioModel.findOne({ slug: params.slug }).lean();

    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio not found" },
        { status: 404 }
      );
    }

    // ✅ Successful response
    return NextResponse.json(
      { success: true, data: portfolio },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error fetching portfolio:", error);

    // Handle known Mongoose errors
    if (error.name === "MongoNetworkError") {
      return NextResponse.json(
        { success: false, message: "Database connection error" },
        { status: 503 }
      );
    }

    // Fallback for unknown errors
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
