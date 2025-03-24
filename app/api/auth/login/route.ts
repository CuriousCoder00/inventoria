import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json("Login Route");
    } catch (error) {
        return NextResponse.json({ error: "Failed to get login route" }, { status: 500 });
    }
}