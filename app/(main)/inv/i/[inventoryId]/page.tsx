"use client";
import React from "react";
import { useParams } from "next/navigation";
const InventoryPage = () => {
  const params = useParams();
  const inventoryId = params?.inventoryId as string;
  return (
    <div>
      inventory page
      <br />
      inventory slug: {inventoryId}
      <br />
    </div>
  );
};

export default InventoryPage;
