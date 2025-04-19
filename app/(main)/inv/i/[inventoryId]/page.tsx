"use client";
import React from "react";
import { useParams } from "next/navigation";
import InventoryLogs from "@/components/main/inventories/i/inventory-logs";
const InventoryPage = () => {
  const params = useParams();
  const inventoryId = params?.inventoryId as string;
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full mt-6 gap-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <InventoryLogs inventoryId={inventoryId} />
      </div>
    </div>
  );
};

export default InventoryPage;
