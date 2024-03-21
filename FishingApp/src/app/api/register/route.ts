import { NextRequest, NextResponse } from "next/server";
import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, surname, email, password, confirmPassword, fishes } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    await connectMongoDb();

    await User.create({ name, surname, email, password: hashedPassword, fishes});

    console.log({ name: name, surname: surname, email: email, password: password, confirm_password: confirmPassword, fishes: fishes});
    return NextResponse.json({ message: 'user registered' }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
