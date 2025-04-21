"use client";

import React from "react";
import { useInventory } from "@/context/inventory-context";
import InventorySettingsForm from "@/components/main/inventories/i/settings/inventory-settings";

const InventorySettings = () => {
  const { inventoryId } = useInventory();
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 max-h-dvh">
      <h1 className="text-2xl font-bold">Inventory Settings</h1>
      <InventorySettingsForm inventoryId={Number(inventoryId)} />
    </div>
  );
};

export default InventorySettings;
