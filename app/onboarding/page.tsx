"use client";
import OnboardingMain from "@/components/onboarding/main";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

const Onboarding = () => {
  return (
    <div className="flex flex-col items-start justify-center min-w-dvw min-h-dvh relative">
      <div className="max-w-2xl mx-auto p-4 text-start">
        <h1 className="text-4xl font-bold">Welcome to Inventoria</h1>
        <p className="mt-4 text-lg text-start">
          Your go to place for inventory management to streamline your
          operations and keep track of your products with ease.
        </p>
        <OnboardingMain />
      </div>
      <Button
        variant={"ghost"}
        className="absolute top-5 right-5 hover:bg-transparent cursor-pointer"
      >
        Skip
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Onboarding;
