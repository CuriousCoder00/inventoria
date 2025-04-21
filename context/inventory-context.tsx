// context/InventoryContext.tsx
"use client";
import React, { createContext, useContext } from "react";

const InventoryContext = createContext<{ inventoryId: string }>({ inventoryId: "" });

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({
  inventoryId,
  children,
}: {
  inventoryId: string;
  children: React.ReactNode;
}) => {
  return (
    <InventoryContext.Provider value={{ inventoryId }}>
      {children}
    </InventoryContext.Provider>
  );
};
