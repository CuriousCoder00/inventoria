// context/InventoryContext.tsx
"use client";
import React, { createContext, useContext } from "react";

const InventoryContext = createContext<{ inventoryId: string; status: boolean }>({
  inventoryId: "",
  status: false,
});

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({
  inventoryId,
  children,
  status = false,
}: {
  inventoryId: string;
  children: React.ReactNode;
  status: boolean;
}) => {
  return (
    <InventoryContext.Provider value={{ inventoryId, status: false }}>
      {children}
    </InventoryContext.Provider>
  );
};
