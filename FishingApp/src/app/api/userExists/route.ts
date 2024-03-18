import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDb } from '../../../../lib/mongodb';
import User from '../../../../models/user';

const POST = async (req: NextRequest) => {
  try {
    connectMongoDb();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select('_id');
    console.log('user:', user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
};

export {POST};
