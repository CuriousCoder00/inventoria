import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json("Register Route");
    } catch (error) {
        return NextResponse.json({ error: "Failed to get register route" }, { status: 500 });
    }
}