import { deleteItem } from "@/actions/item/delete";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Item } from "@/lib/index.types";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const ItemTable = ({ item }: { item: Item }) => {
  const inventoryId = item.inventoryId;
  const handleDelete = async (itemId: number) => {
    try {
      const res = await deleteItem(itemId);
      if (res.success) {
        toast.success(res.message);
        document.getElementById(`${itemId}`)?.remove();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Unexpected error while deleting item");
      console.error(error);
    }
  };
  return (
    <TableRow id={`${item.id}`} key={item.id}>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell className="text-right">{item.quantity}</TableCell>
      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
      <TableCell className="text-right">{item.status}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Link
            className="border border-border rounded-md hover:bg-background p-2 flex items-center justify-center"
            href={`/inv/i/${inventoryId}/manage/item/${item.id}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ItemTable;
