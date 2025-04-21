"use server";

import prisma from "@/lib/prisma";

export const deleteItem = async (itemId: number) => {
    try {
        await prisma.item.delete({
            where: {
                id: itemId,
            },
        });
        return {
            success: true,
            message: "Item deleted successfully",
        };
    } catch (error: any) {
        console.error("Error deleting item:", error);
        return {
            success: false,
            message: error.message || "Failed to delete item",
        };
    }
}