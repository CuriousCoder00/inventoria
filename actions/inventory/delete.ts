"use server";

import prisma from "@/lib/prisma";

export const deleteInventory = async (inventoryId: number) => {
    try {
        await prisma.inventory.delete({
            where: {
                id: inventoryId,
            }
        });
        return {
            success: true,
            message: "Inventory deleted successfully",
        };
    } catch (error: any) {
        console.error("Error deleting inventory:", error);
        return {
            success: false,
            message: error.message || "Failed to delete inventory",
        };
    }
}