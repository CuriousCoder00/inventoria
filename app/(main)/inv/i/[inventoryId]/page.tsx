"use client";
import React from "react";
import { useParams } from "next/navigation";
import InventoryLogs from "@/components/main/inventories/i/inventory-logs";
import InventoryStatCard from "@/components/main/inventories/inventory-stat-card";
import {
  AlertTriangle,
  DollarSign,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { Inventory } from "@/lib/index.types";
import { getInventoryById } from "@/actions/inventory/get-inventory";
import InventoryHeader from "@/components/main/inventories/i/inventory-header";
const InventoryPage = () => {
  const params = useParams();
  const inventoryId = params?.inventoryId as string;
  const [inventory, setInventory] = React.useState<Inventory | null>(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      const res = await getInventoryById(Number(inventoryId));
      if (res.success) {
        setInventory(res.inventory);
      } else {
        setInventory(null);
      }
      setLoading(false);
    };
    fetchInventory();
  }, []);
  if(loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Fetching Inventory Details...
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start justify-start w-full relative h-full max-w-[88vh] overflow-y-auto min-w-full no-scrollbar">
      <InventoryHeader
        name={inventory?.name}
        lastUpdated={inventory?.updatedAt}
      />
      <div className="flex flex-col items-start justify-start w-full mt-6 gap-4">
        <h2 className="text-2xl font-bold text-start">Inventory Details</h2>
        <p className="text-start text-neutral-500 mt-2">
          Here is a quick overview of your inventory
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full">
        {stats.map((stat, index) => (
          <InventoryStatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className="flex flex-col items-start justify-start w-full mt-6 gap-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <InventoryLogs inventoryId={inventoryId} />
      </div>
    </div>
  );
};

export default InventoryPage;

const stats = [
  { title: "Total Products", value: 128, icon: <PackageCheck /> },
  { title: "Stock Value", value: "$4,520", icon: <DollarSign /> },
  { title: "Low Stock Items", value: 12, icon: <AlertTriangle /> },
  { title: "Out of Stock", value: 5, icon: <PackageX /> },
];
