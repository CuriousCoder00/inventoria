"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();
        const userExists = await getUserByEmail(email);
        if (!userExists) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 })
        }

        await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT })
        return NextResponse.json({ message: "User Login Successful" }, { status: 200 })
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
                default:
                    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
            }
        } else {
            return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 })
        }
    }
}