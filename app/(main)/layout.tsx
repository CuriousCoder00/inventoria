import React from "react";
import { SidebarMain } from "@/components/main/sidebar";
import Header from "@/components/main/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-dvw flex flex-col md:flex-row h-dvh min-h-dvh min-w-dvw max-w-7xl mx-auto">
      <SidebarMain />
      <div className="flex-1 flex flex-col bg-neutral-950">
        <Header />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
