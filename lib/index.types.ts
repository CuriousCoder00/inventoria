export interface StatCardProps {
    title: string;
    value: number;
    trend: string;
}

export interface InventoryCardProps {
    name: string;
    description: string;
    items: Items[];
    status?: string;
    image?: string | null;
}

export interface Inventory {
    id: number;
    name: string;
    description: string;
    image: string | null;
    items: Items[];
    status: string;
    userId: string;
}

export interface Items {
    id: number;
    name: string;
    description: string;
    image: string | null;
    quantity: number;
    price: number;
    category: string | null;
    status: string;
    inventoryId: number;
}