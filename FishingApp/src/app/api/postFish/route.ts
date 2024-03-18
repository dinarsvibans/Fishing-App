import { NextRequest, NextResponse } from "next/server";
import { connectMongoDb } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { formState, email } = body;
        console.log('email', email);
        console.log('formState', formState);

        await connectMongoDb();

        const user = await User.findOne({ email });
        console.log('user', user);

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        await User.findOneAndUpdate({ email }, { $push: { fishes: formState } });
        
        console.log('user', user);
        return new NextResponse("Fish data added successfully", { status: 200 });
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
