"use server";
import bcryptjs from "bcryptjs";

import { sendPasswordResetLink } from "@/lib/mailer/nodemailer";
import { generatePasswordResetToken, getUserByEmail } from "../utils";
import prisma from "@/lib/prisma";

export const passwordResetMail = async (email: string) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (!existingUser) return { success: false, message: "Email does not exist" };
        await prisma.passwordResetToken.deleteMany({
            where: {
                email,
            },
        });
        // Generate a new password reset token
        const verificationToken = await generatePasswordResetToken(email);
        await sendPasswordResetLink(verificationToken.email, existingUser.firstName);
        return { success: true, message: "Password reset email sent successfully" };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
}

export const createNewPassword = async (password: string, token: string) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findFirst({
            where: {
                token,
            },
        });
        if (!passwordResetToken) return { success: false, message: "Invalid or expired token" };
        const hashedPassword = await bcryptjs.hash(
            password,
            await bcryptjs.genSalt(10)
        );
        const user = await prisma.user.update({
            where: {
                email: passwordResetToken.email,
            },
            data: {
                password: hashedPassword,
            },
        });
        if (!user) return { success: false, message: "User not found" };
        await prisma.passwordResetToken.delete({
            where: {
                id: passwordResetToken.id,
            },
        });
        return { success: true, message: "Password updated successfully" };
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" };
    }
}