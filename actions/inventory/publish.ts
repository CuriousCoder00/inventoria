"use server";

import prisma from "@/lib/prisma";

export const publishInventory = async (inventoryId: number) => {
    try {
        const inventory = await prisma.inventory.update({
            where: {
                id: inventoryId,
            },
            data: {
                published: true,
            },
        });
        return { success: true, inventory, message: "Inventory published successfully." };
    } catch (error: any) {
        console.log(error);
        return { success: false, inventory: null, message: error.message || "Something went wrong." };
    }
}

export const unpublishInventory = async (inventoryId: number) => {
    try {
        const inventory = await prisma.inventory.update({
            where: {
                id: inventoryId,
            },
            data: {
                published: false,
            },
        });
        return { success: true, inventory, message: "Inventory unpublished successfully." };
    } catch (error: any) {
        console.log(error);
        return { success: false, inventory: null, message: error.message || "Something went wrong." };
    }
}