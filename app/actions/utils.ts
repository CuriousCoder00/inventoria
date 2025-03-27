import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export const getUserById = async (userId: string) => {
    try {
        if (!userId) {
            console.warn("No user id found")
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user;
    } catch (error) {
        console.error("Error fetching user by id", error)
        return null;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        if (!email) {
            console.warn("No email found")
            return;
        }
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        return user;
    } catch (error) {
        console.error("Error fetching user by email", error)
        return null;
    }
}

export const getAccountByUserId = async (userId: string) => {
    try {
        if (!userId) {
            console.warn("No user id found")
            return;
        }
        const account = await prisma.account.findFirst({
            where: {
                userId
            }
        })
        return account;
    } catch (error) {
        console.error("Error fetching account by user id", error)
        return null;
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        if (!email) {
            console.warn("No email found")
            return;
        }
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                email
            }
        })
        return verificationToken;
    } catch (error) {
        console.error("Error fetching verification token by email", error)
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        if (!email) {
            console.warn("No email found")
            return;
        }
        const passwordResetToken = await prisma.passwordResetToken.findFirst({
            where: {
                email
            }
        })
        return passwordResetToken;
    } catch (error) {
        console.error("Error fetching password reset token by email", error)
        return null;
    }
}

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        if (!token) {
            console.warn("No token found")
            return;
        }
        const passwordResetToken = await prisma.passwordResetToken.findFirst({
            where: {
                token
            }
        })
        return passwordResetToken;
    } catch (error) {
        console.error("Error fetching password reset token by token", error)
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        if (!token) {
            console.warn("No token found")
            return;
        }
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                token
            }
        })
        return verificationToken;
    } catch (error) {
        console.error("Error fetching verification token by token", error)
        return null;
    }
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await prisma.verificationToken.delete({
            where: { id: existingToken.id },
        });
    }
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expiresAt: expires,
        },
    });

    return verificationToken;
};


export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: { id: existingToken.id },
        });
    }
    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expiresAt: expires,
        },
    });

    return passwordResetToken;
};