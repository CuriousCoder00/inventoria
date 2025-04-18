"use client";
import { getAllInventory } from "@/actions/inventory/get-inventory";
import InventoryHeader from "@/components/main/inventories/header";
import InventoryCard from "@/components/main/inventories/inventory-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inventory } from "@/lib/index.types";
import { useSession } from "next-auth/react";
import React from "react";

const InventoryPage = () => {
  const [inventories, setInventories] = React.useState<Inventory[] | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const session = useSession();
  React.useEffect(() => {
    const fetchInventories = async () => {
      setLoading(true);
      const res = await getAllInventory(session?.data?.user.id as string);
      console.log(res)
      if (res.success) {
        setInventories(res.inventories);
      } else {
        setInventories(null);
      }
      setLoading(false);
    };
    fetchInventories();
  }, []);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full overflow-hidden">
      <InventoryHeader />
      <div className="flex items-center justify-start w-full h-full mt-6 overflow-y-auto">
        <ScrollArea className="w-full h-full">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              Fetching Inventories...
            </div>
          ) : !inventories || inventories?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              No Inventories Found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full">
              {inventories?.map((inventory) => (
                <InventoryCard
                  key={inventory.id}
                  name={inventory.name}
                  description={inventory.description}
                  items={inventory.items}
                  status={inventory.status}
                  image={inventory.image}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default InventoryPage;
