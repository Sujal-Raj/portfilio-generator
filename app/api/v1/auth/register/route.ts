import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { dbConnect } from "@/lib/db";

export async function POST(req: NextRequest) {
  // console.log("here");
  try {
    await dbConnect();
    const {email} = await req.json();

    const userExist = await  UserModel.findOne({email});
    if(userExist){
        return NextResponse.json({
            message:"User already exist"
        },{
            status:200
        })
    }

    const user = new UserModel({
      email,
    });

    await user.save();

    return NextResponse.json(
      {
        message: "User saved",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Something went wrong"},
      {
      status: 500,
    });
  }
}
