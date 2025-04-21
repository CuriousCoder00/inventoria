"use client";
import { InventorySidebar } from "@/components/main/inventories/i/sidebar";
import { useParams } from "next/navigation";
import React from "react";
import { InventoryProvider } from "@/context/inventory-context";
import InventoryStatusNotification from "@/components/main/inventories/i/status";
import { getInventoryPublishedStatus } from "@/actions/inventory/get-inventory";

const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const inventoryId = params?.inventoryId as string;
  const [status, setStatus] = React.useState<boolean>(false);
  const fetchInventoryStatus = async (id:string) => {
    const res = await getInventoryPublishedStatus(Number(id));
    if (res.success) {
      setStatus(res.published);
    } else {
      setStatus(false);
    }
  }
  React.useEffect(() => {
    fetchInventoryStatus(inventoryId);
  }, [inventoryId]);
  return (
    <div className="flex items-start justify-start w-full h-full gap-4 overflow-hidden max-h-[90dvh]">
      <InventorySidebar inventoryId={inventoryId} />
      <div className="flex flex-col items-start justify-start w-full h-full p-4 overflow-hidden max-h-[90dvh]">
        <InventoryProvider inventoryId={inventoryId} status={status} >
          <InventoryStatusNotification inventoryId={Number(inventoryId)} status={status} />
          {children}
        </InventoryProvider>
      </div>
    </div>
  );
};

export default InventoryLayout;
