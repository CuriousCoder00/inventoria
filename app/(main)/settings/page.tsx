import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const SettingsPage = () => {
  return (
    <div>
      Settings Page
      <br />
      <ThemeToggle />
      <div className="flex items-center justify-center w-full h-full p-4 overflow-hidden">
        We are working on this page. Please check back later.
      </div>
    </div>
  );
};

export default SettingsPage;
