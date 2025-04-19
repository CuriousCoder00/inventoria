"use client";

import { InventoryLogTypes } from "@/lib/index.types";
import React from "react";
import InventoryLogCard from "./inventory-log-card";
import { getInventoryLogs } from "@/actions/audit-logs/inventory-logs";

const InventoryLogs = ({inventoryId}:{inventoryId: string}) => {
  const [logs, setLogs] = React.useState<InventoryLogTypes[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const fetchLogs = async () => {
    try {
      const res = await getInventoryLogs(Number(inventoryId));
      if (res) {
        setLogs(res);
      }
    } catch (error: any) {
      console.error("Error fetching system logs:", error.message);
    }
  };
  React.useEffect(() => {
    fetchLogs();
    setLoading(false);
  }, []);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 overflow-y-auto max-h-[50dvh]">
      <div className="flex flex-col w-full gap-4">
        {logs ? (
          logs.map((log) => (
            <InventoryLogCard
              key={log.id}
              actionType={log.action}
              message={log.message}
              createdAt={log.createdAt}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full p-4 text-gray-500 dark:text-gray-400">
            No logs available
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryLogs;
