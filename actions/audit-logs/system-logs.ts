"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getSystemLogs = async () => {
    try {
        const session = await auth();
        const logs = await prisma.systemActivityLog.findMany({
            where: {
                userId: session?.user.id as string,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return logs;
    } catch (error) {
        console.log(error);
        return null;
    }
}