"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size={"icon"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};
