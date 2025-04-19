"use server";

import prisma from "@/lib/prisma";
import { generateVerificationToken, getUserByEmail, getVerificationTokenByToken } from "../utils";
import { sendVerificationMail } from "@/lib/mailer/nodemailer";

export const verifyEmail = async (token: string) => {
    try {
        const existingToken = await getVerificationTokenByToken(token);
        if (!existingToken) return { success: false, message: "Invalid Token!" };
        const existingUser = await getUserByEmail(existingToken.email);
        if (!existingUser) return { success: false, message: "Email does not exist" };
        await prisma.user.update({
            where: { id: existingUser.id },
            data: { emailVerified: new Date() },
        });
        await prisma.verificationToken.delete({
            where: { id: existingToken.id },
        });
        return { success: true, message: "Email verified successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const resendVerificationEmail = async (email: string) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (!existingUser) return { success: false, message: "Email does not exist" };
        if (existingUser.emailVerified) return { success: false, message: "Email already verified" };
        await prisma.verificationToken.deleteMany({
            where: { email },
        });
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationMail(verificationToken.email, existingUser.firstName);
        return { success: true, message: "Verification email sent successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}