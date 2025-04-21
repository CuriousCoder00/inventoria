"use client";
import { getItems } from "@/actions/item/get";
import ManageInventoryHeader from "@/components/main/inventories/i/manage/header";
import ItemList from "@/components/main/inventories/i/manage/item-list";
import { useInventory } from "@/context/inventory-context";
import { Item } from "@/lib/index.types";
import React from "react";

const ManageInventoryPage = () => {
  const [items, setItems] = React.useState<Item[] | null>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const inventory = useInventory();
  const inventoryId = inventory?.inventoryId;
  React.useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await getItems(Number(inventoryId));
        if (res.success) {
          setItems(res.items);
        } else {
          setItems(null);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems(null);
      }
      setLoading(false);
    };
    if (inventoryId) {
      fetchItems();
    }
  }, [inventoryId]);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 max-h-dvh">
      <ManageInventoryHeader />
      <div className="flex flex-col items-start justify-start w-full h-full gap-4 max-h-[90dvh] overflow-y-auto">
        <p className="text-sm text-muted-foreground">
          Here you can manage your inventory items, add new items, and publish
          your inventory.
        </p>
        {/* Add your inventory management components here */}
        <div className="flex flex-col items-start justify-start w-full gap-4 p-4 border border-border rounded-md bg-background">
          <h2 className="text-xl font-bold">Inventory Items</h2>
          <p className="text-sm text-muted-foreground">
            List of items in your inventory.
          </p>
          <ItemList items={items as Item[]} />
        </div>
      </div>
    </div>
  );
};

export default ManageInventoryPage;
