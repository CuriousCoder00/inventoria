import React from "react";

import { ThemeProvider } from "next-themes";
import { Toaster } from "./ui/toaster";

const Providers = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
