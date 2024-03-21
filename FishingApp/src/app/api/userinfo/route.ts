import { NextRequest, NextResponse } from "next/server";
import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import Fish from "../../../../models/fishes";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDb();
    const { userId } = await req.json();
    const userInfo = await User.findById( userId );
    const fishes = await Fish.find({user: userId})
    return NextResponse.json({ userInfo, fishes });
  } catch (error) {
    console.error('Error during user info fetch:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}