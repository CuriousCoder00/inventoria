import React from "react";
import { SidebarMain } from "@/components/main/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-dvw flex flex-col md:flex-row h-dvh min-h-dvh min-w-dvw max-w-7xl mx-auto">
      <SidebarMain />
      <div className="flex-1 flex flex-col dark:bg-neutral-950 bg-neutral-100 py-4 pr-2">
        <div className="flex-1 overflow-y-auto rounded-lg dark:bg-black bg-white p-4">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
