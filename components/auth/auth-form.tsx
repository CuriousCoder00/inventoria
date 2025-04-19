"use client"
import React from "react";
import { Form } from "../ui/form";
import GoogleAuth from "./google-auth";

const AuthForm = ({
  children,
  form,
}: {
  children: React.ReactNode;
  form: any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
}) => {
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input border border-border">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Inventoria
      </h2>
      <Form {...form}>{children}</Form>
      <GoogleAuth />
    </div>
  );
};

export default AuthForm;
