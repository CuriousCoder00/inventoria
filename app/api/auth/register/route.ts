"use server";

import bcryptjs from "bcryptjs";
import { db } from "@/lib/prisma.config";
import { getUserByEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email, name, password } = await req.json();
        console.log(email, name, password)
        const userExists = await getUserByEmail(email);
        if (userExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 })
        }
        const hashedPassword = await bcryptjs.hash(
            password,
            await bcryptjs.genSalt(10)
        );
        await db.user.create({
            data: {
                name, email, password: hashedPassword
            }
        })
        return NextResponse.json({ message: "User Registration Successful" }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Something went wrong." }, { status: 500 })
    }
}