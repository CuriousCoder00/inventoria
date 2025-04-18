import React from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
const Providers = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <SessionProvider session={session}>{children}</SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
