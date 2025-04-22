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

export const getInventoryById = async (id: number) => {
    try {
        const inventory = await prisma.inventory.findUnique({
            where:{
                id: id
            },
            include: {
                items: true,
            }
        })
        if(!inventory) return {success: false, inventory: null, message: "Inventory not found."}
        return {success: true, inventory, message: "Inventory fetched successfully."}
    } catch (error: any) {
        console.log(error)
        return {success: false, inventory: null, message: error.message || "Something went wrong."}
    }
}

export const getPublicInventories = async () => {
    try {
        const inventories = await prisma.inventory.findMany({
            where:{
                published: true
            },
            include: {
                items: true,
            }
        })
        if(!inventories) return {success: true, inventories: null, message: "No public inventories found."}
        return {success: true, inventories, message: "Public inventories fetched successfully."}
    } catch (error: any) {
        console.log(error)
        return {success: false, inventories: null, message: error.message || "Something went wrong."}
    }
}

export const getPublicInventoryById = async (id: number) => {
    try {
        const inventory = await prisma.inventory.findUnique({
            where:{
                id: id,
                published: true
            },
            include: {
                items: true,
            }
        })
        if(!inventory) return {success: false, inventory: null, message: "Inventory not found."}
        return {success: true, inventory, message: "Inventory fetched successfully."}
    } catch (error: any) {
        console.log(error)
        return {success: false, inventory: null, message: error.message || "Something went wrong."}
    }
}
export const getInventoryPublishedStatus = async (id: number) => {
    try {
        const res = await prisma.inventory.findUnique({
            where: {
                id: id
            },
            select: {
                published: true
            }
        })
        if(!res) return { success: false, published: false }
        return { success: true, published: res.published }
    } catch (error: any) {
        console.log(error)
        return { success: false, published: false }
    }
}