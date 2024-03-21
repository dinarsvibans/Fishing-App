import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDb } from '../../../../lib/mongodb';
import Fish from '../../../../models/fishes';
import User from '../../../../models/user';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDb();
    const body = await req.json();
    const { formState, userId } = body;
    const {
      fishName,
      fishLength,
      fishWeight,
      fishingRodName,
      fishingRodLength,
      fishingRodTest,
      biteName,
      fishingLineType,
      photo,
    } = formState;
    const fisherMan = await User.findById(userId);
    const fisherManName = `${fisherMan.name} ${fisherMan.surname}`;
    await Fish.create({
      fishName,
      fishLength,
      fishWeight,
      fishingRodName,
      fishingRodLength,
      fishingRodTest,
      biteName,
      fishingLineType,
      photo,
      user: userId,
      fisherManName,
    });

    return new NextResponse('Fish data added successfully', { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
