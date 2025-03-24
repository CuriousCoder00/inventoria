import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json("Inventory Route");
    } catch (error) {
        return NextResponse.json({ error: "Failed to get inventory route" }, { status: 500 });
    }
}