import { NextRequest, NextResponse } from "next/server";
import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDb();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error during user info fetch:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}