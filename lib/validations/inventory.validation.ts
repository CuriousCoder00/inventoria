import { InventoryStatus } from "@prisma/client";
import { z } from "zod";

export const inventorySchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
});

export const inventoryUpdateSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
});

export const inventoryImageSchema = z.object({
    image: z.string().optional(),
});

export const inventoryStatusSchema = z.object({
    status: z.enum(Object.values(InventoryStatus) as [InventoryStatus, ...InventoryStatus[]]).optional(),
});


export type InventoryInput = z.infer<typeof inventorySchema>;
export type InventoryUpdateInput = z.infer<typeof inventoryUpdateSchema>;
export type InventoryImageInput = z.infer<typeof inventoryImageSchema>;
export type InventoryStatusInput = z.infer<typeof inventoryStatusSchema>;