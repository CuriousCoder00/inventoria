"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Item } from "@/lib/index.types";
import ItemTable from "./item-table";

interface ItemListProps {
  items: Item[];
}

export default function ItemList({ items }: ItemListProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(id: string) {
    setLoading(id);
    try {
      //   await deleteProduct(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: Item) => (
            <ItemTable key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No products found. Add your first product using the form.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
