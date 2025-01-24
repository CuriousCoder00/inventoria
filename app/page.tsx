"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./components/theme-toggle";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Button onClick={() => signIn("google")}>Login</Button>
    </div>
  );
}
