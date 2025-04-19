import { InventoryLogCardProps } from "@/lib/index.types";
import React from "react";

const InventoryLogCard = ({
  actionType,
  createdAt,
  message,
}: InventoryLogCardProps) => {
  const colorClass = actionTypeColors[actionType] || "border-l-gray-400";
  return (
    <div
      className={`flex flex-col items-start justify-start w-full h-full gap-4 p-4 overflow-hidden bg-white dark:bg-neutral-950 border-l-2 ${colorClass}  border border-border`}
    >
      <div className="flex items-start justify-start w-full gap-4">
        <div className="flex items-center justify-between w-full gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryLogCard;

const actionTypeColors: Record<string, string> = {
  created_inventory: "border-l-green-500",
  deleted_inventory: "border-l-red-500",
  updated_inventory: "border-l-yellow-500",
  // Add more as needed
};
