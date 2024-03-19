import { connectMongoDb } from "../../../../lib/mongodb";
import { NextResponse, NextRequest } from 'next/server';
import User from "../../../../models/user";

export async function GET (){
    await connectMongoDb()
    const users = await User.find()
    return NextResponse.json(users)
}