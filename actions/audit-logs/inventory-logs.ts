"use server";
import prisma from "@/lib/prisma";

export const getInventoryLogs = async (inventoryId: number) => {
    try {
        const logs = await prisma.inventoryActivityLog.findMany({
            where: {
                inventoryId: inventoryId,
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