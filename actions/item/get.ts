"use server";
import prisma from "@/lib/prisma";

export const getItem = async (itemId: number) => {
    try {
        const item = await prisma.item.findUnique({
            where: {
                id: itemId,
            },
        });
        return { success: true, item, message: "Item fetched successfully." };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            item: null,
            message: error.message || "Something went wrong.",
        };
    }
};
export const getItems = async (inventoryId: number) => {
    try {
        const items = await prisma.item.findMany({
            where: {
                inventoryId: inventoryId,
            },
        });
        return { success: true, items, message: "Items fetched successfully." };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            items: null,
            message: error.message || "Something went wrong.",
        };
    }
}