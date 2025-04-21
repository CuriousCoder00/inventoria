"use server";

import prisma from "@/lib/prisma";
import { InventoryUpdateInput } from "@/lib/validations/inventory.validation";

export const updateImage = async (imageUrl: string, inventoryId: number) => {
    try {
        const inventory = await prisma.inventory.update({
            where: {
                id: inventoryId
            },
            data: {
                image: imageUrl
            }
        })
        console.log(inventory)
        return { success: true, inventory, message: "Inventory image updated successfully." }
    } catch (error: any) {
        console.log(error)
        return { success: false, inventory: null, message: error.message || "Something went wrong." }
    }
}

export const updateInventoryDetails = async (data: InventoryUpdateInput, inventoryId: number) => {
    try {
        const inventory = await prisma.inventory.update({
            where: {
                id: inventoryId
            },
            data: {
                name: data.name,
                description: data.description
            }
        })
        return { success: true, inventory, message: "Inventory updated successfully." }
    } catch (error: any) {
        console.log(error)
        return { success: false, inventory: null, message: error.message || "Something went wrong." }
    }
}