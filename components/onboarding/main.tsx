"use client";
import React from "react";
import CreateInventoryForm from "./create-inventory-form";
const OnboardingMain = () => {
  return (
    <div className="flex flex-col w-full text-start items-start justify-center">
        <p className="mt-4 text-lg text-start">
          Please create an inventory to get started:
        </p>
        <div className="mt-4 space-y-3 w-full">
          <CreateInventoryForm />
        </div>
    </div>
  );
};

export default OnboardingMain;
