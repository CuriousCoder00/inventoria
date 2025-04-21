import { z } from "zod";
import { ItemStatus } from "@prisma/client";

export const itemSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    image: z.string().optional(),
    status: z.enum(Object.values(ItemStatus) as [ItemStatus, ...ItemStatus[]]).optional(),
    category: z.string().min(1, "Category is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be at least 0"),
    tags: z.array(z.string()).optional(),
});

export type ItemInput = z.infer<typeof itemSchema>;