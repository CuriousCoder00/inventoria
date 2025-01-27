import React from "react";

import { ThemeProvider } from "next-themes";
import { Toaster } from "./ui/toaster";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
