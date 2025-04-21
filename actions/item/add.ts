"use server";

import prisma from "@/lib/prisma";
import { ItemInput } from "@/lib/validations/item.validation";

export const addItem = async (data: ItemInput, inventoryId: number) => {
    try {
        const item = await prisma.item.create({
            data: {
                name: data.name,
                description: data.description,
                quantity: data.quantity,
                price: data.price,
                category: data.category,
                tags: data.tags,
                image: data.image,
                status: data.status,
                inventoryId: inventoryId,
            },
        });
        return { success: true, item, message: "Item added successfully." };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            item: null,
            message: error.message || "Something went wrong.",
        };
    }
}