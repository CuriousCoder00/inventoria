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

export type InventoryInput = z.infer<typeof inventorySchema>;
export type InventoryUpdateInput = z.infer<typeof inventoryUpdateSchema>;