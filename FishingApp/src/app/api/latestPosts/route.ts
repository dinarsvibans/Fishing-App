import { connectMongoDb } from "../../../../lib/mongodb";
import { NextResponse, NextRequest } from 'next/server';
import Fish from "../../../../models/fishes";

export async function GET (){
    await connectMongoDb()
    const Posts = await Fish.find().sort({ createdAt: -1 })
    return NextResponse.json(Posts)
}