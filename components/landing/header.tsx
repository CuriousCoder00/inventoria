"use client";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../theme-toggle";

const Header = () => {
  return (
    <header className="fixed px-4 md:px-24 backdrop-filter backdrop-blur-lg bg-opacity-10 z-50 w-full inset-x-0 top-0">
      <nav className="flex justify-between items-center gap-4 h-16">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="text-2xl font-bold">
            Inventoria
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a href="/auth/login" className="text-sm">
            Login
          </a>
          <a href="/auth/register" className="text-sm">
            Sign Up
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
