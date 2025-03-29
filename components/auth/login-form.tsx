"use client";
import React from "react";
import LabelInputContainer from "./label-input-container";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import BottomGradient from "../bottom-gradient";
import { useForm } from "react-hook-form";
import { loginSchema, LoginInput } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "./auth-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof LoginInput, e.target.value);
  };

  return (
    <AuthForm form={form}>
      <div className="my-4 flex items-center gap-2 justify-start">
        Don't have an account?{" "}
        <Link
          className="text-sm hover:underline text-sky-500"
          href={"/auth/register"}
        >
          Create Account
        </Link>
      </div>
      <div className="my-2 flex items-center justify-center gap-2">
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
        <span>OR</span>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
      </div>
      <h4 className="font-bold text-lg my-4">Login to your account</h4>
      <form className="my-8 flex flex-col space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={onValueChange}
                  placeholder="john.doe@gmail.com"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    onChange={onValueChange}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <Button
                    variant={"ghost"}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <EyeIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-xs text-sky-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-4 h-[1px] w-full" />
      </form>
    </AuthForm>
  );
};

export default LoginForm;
