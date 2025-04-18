"use server";

import prisma from "@/lib/prisma";

export const getAllInventory = async (userId: string) => {
    try {
        const inventories = await prisma.inventory.findMany({
            where:{
                userId: userId
            },
            include: {
                items: true,
            }
        })
        if(!inventories) return {success: true, inventories: null, message: "You don't have any inventories yet. Please create one."}
        return {success: true, inventories, message: "Inventories fetched successfully."}
    } catch (error: any) {
        console.log(error)
        return {success: false, inventories: null, message: error.message || "Something went wrong."}
    }
}