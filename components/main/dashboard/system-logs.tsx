"use client";

import { getSystemLogs } from "@/actions/audit-logs/system-logs";
import { SystemLogTypes } from "@/lib/index.types";
import React from "react";
import SystemLogCard from "./system-log-card";

const SystemLogs = () => {
  const [logs, setLogs] = React.useState<SystemLogTypes[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const fetchLogs = async () => {
    try {
      const res = await getSystemLogs();
      if (res) {
        setLogs(res);
      }
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      console.error("Error fetching system logs:", error.message);
    }
  };
  React.useEffect(() => {
    fetchLogs();
    setLoading(false);
  }, []);
  if(loading) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4 text-gray-500 dark:text-gray-400">
        Fetching Logs...
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 overflow-y-auto max-h-[50dvh]">
      <div className="flex flex-col w-full gap-4">
        {logs ? (
          logs.map((log) => (
            <SystemLogCard
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

export default SystemLogs;
