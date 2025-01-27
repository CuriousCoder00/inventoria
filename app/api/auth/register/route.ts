"use server";

import bcryptjs from "bcryptjs";
import { db } from "@/lib/prisma.config";
import { getUserByEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationMail } from "@/lib/mailer";

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
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationMail(verificationToken.email, name)
        return NextResponse.json({ message: "User Registration Successful. Please verify your email to login." }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Something went wrong." }, { status: 500 })
    }
}