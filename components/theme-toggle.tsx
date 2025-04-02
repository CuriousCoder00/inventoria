"use client";
import React from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <MoonStar />}
    </Button>
  );
};
