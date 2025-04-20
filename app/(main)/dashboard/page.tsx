"use client";
import StatCard from "@/components/main/dashboard/stat-card";
import SystemLogs from "@/components/main/dashboard/system-logs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const session = useSession();
  const router = useRouter();
  const user = session?.data?.user;
  if (!user) router.refresh();
  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex flex-col items-start justify-start">
        <h2 className="text-2xl font-bold text-start">
          Welcome back, {user?.firstName}
        </h2>
        <p className="text-start text-neutral-500 mt-2">
          Here is a quick overview of your inventory
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </div>
      <div className="flex flex-col items-start justify-start w-full mt-6 gap-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <SystemLogs />
      </div>
    </div>
  );
};

export default DashboardPage;

const stats = [
  { title: "Total Products", value: 0, trend: "+12.5%" },
  { title: "Total Sales", value: 0, trend: "+12.5%" },
  { title: "Total Visits", value: 0, trend: "+12.5%" },
  { title: "Total Customers", value: 0, trend: "+12.5%" },
];
