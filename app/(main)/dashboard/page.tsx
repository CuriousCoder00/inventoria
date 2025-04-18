"use client";
import StatCard from "@/components/main/dashboard/stat-card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const session = useSession();
  const router = useRouter();
  const user = session?.data?.user;
  if(!user) router.refresh()
  return (
    <div className="flex flex-col items-start justify-start">
      <div className="flex flex-col items-start justify-start">
        <h2 className="text-2xl font-bold text-start">Welcome back, {user?.firstName}</h2>
        <p className="text-start text-neutral-500 mt-2">
          Here is a quick overview of your inventory
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full">
        <StatCard title="Total Products" value={0} trend="+12.5%" />
        <StatCard title="Total Sales" value={0} trend="+12.5%" />
        <StatCard title="Total Visits" value={0} trend="+12.5%" />
        <StatCard title="Total Customers" value={0} trend="+12.5%" />
      </div>
    </div>
  );
};

export default DashboardPage;
