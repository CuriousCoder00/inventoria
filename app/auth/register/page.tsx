"use client";
import RegistrationForm from "@/components/auth/registeration-form";
import Header from "@/components/landing/header";
import React from "react";

const RegistrationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mt-20">
      <Header />
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
