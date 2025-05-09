export interface StatCardProps {
    title: string;
    value: number;
    trend: string;
}

export interface InventoryStatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
}

export interface InventoryCardProps {
    name: string;
    description: string;
    items: Item[];
    status?: string;
    image?: string | null;
}

export interface Inventory {
    id: number;
    name: string;
    description: string;
    image: string | null;
    items: Item[];
    status: string;
    userId: string;
    updatedAt: Date;
}

export interface Item {
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

export interface PublicInventoryHeaderProps {
    name: string;
    image: string | null;
}

export interface SystemLogTypes {
    id: number;
    createdAt: Date;
    userId: string;
    action: string;
    message: string;
}

export interface SystemLogCardProps {
    actionType: string;
    message: string;
    createdAt: Date;
}

export interface InventoryLogTypes {
    id: number;
    createdAt: Date;
    entityType: string;
    entityId: number | null;
    action: string;
    message: string;
    inventoryId: number;
}

export interface InventoryLogCardProps {
    actionType: string;
    message: string;
    createdAt: Date;
}