"use client"
import React from "react";

const Header = () => {
  return (
    <header className="fixed px-4 md:px-24 backdrop-filter backdrop-blur-lg bg-opacity-10 z-50 w-full inset-x-0">
      <nav className="flex justify-between items-center gap-4 h-16">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Inventoria</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm">Features</a>
          <a href="#" className="text-sm">Pricing</a>
          <a href="#" className="text-sm">Contact</a>
          <a href="#" className="text-sm">Login</a>
          <a href="#" className="text-sm">Sign Up</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;