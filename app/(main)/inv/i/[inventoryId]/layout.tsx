"use client";
import { InventorySidebar } from "@/components/main/inventories/i/sidebar";
import { useParams } from "next/navigation";
import React from "react";

const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const inventoryId = params?.inventoryId as string;
  return (
    <div className="flex items-start justify-start w-full h-full gap-4 overflow-hidden max-h-dvh">
      <InventorySidebar inventoryId={inventoryId} />
      <div className="flex items-start justify-start w-full h-full p-4 overflow-hidden max-h-[90dvh]">
        {children}
      </div>
    </div>
  );
};

export default InventoryLayout;
