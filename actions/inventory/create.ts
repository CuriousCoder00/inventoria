"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { InventoryInput } from "@/lib/validations/inventory.validation";


export const createInventory = async (data: InventoryInput) => {
    try {
        const {name, description} = data;
        const session = await auth();
        const existingInventory = await prisma.inventory.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        });
        if(existingInventory) {
            return {
                success: false,
                message: "Inventory with this name already exists",
                warn: true,
            }
        }
        const inventory = await prisma.inventory.create({
            data:{
                name: name,
                description: description,
                userId: session?.user.id as string,
            }
        })
        return {
            success: true,
            message: "Inventory created successfully",
            inventory,
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong",
            warn: false,
        }
    }
}

export const inventoryNameCheck = async (name: string) => {
    try {
        const inventory = await prisma.inventory.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        })
        if (inventory) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return null;
    }
}