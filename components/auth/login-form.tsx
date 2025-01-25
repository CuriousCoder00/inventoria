"use client";

import {
  userLoginSchema,
  UserLoginInput,
} from "@/lib/validations/user.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "./auth-form";
import { AuthInput } from "./auth-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Form } from "../ui/form";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const form = useForm<UserLoginInput>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const authError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Please login with different email."
      : null;
  const handleLogin = async (data: UserLoginInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if ("message" in result) {
        toast({
          title: result.message,
        });
        form.reset();
      } else {
        toast({
          title: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm loading={loading}>
      <Form {...form}>
        <form
          className="flex flex-col w-full gap-4 my-4"
          onSubmit={form.handleSubmit(handleLogin)}
        >
          <AuthInput
            form={form}
            label="Email Address"
            name="email"
            disabled={loading}
            placeholder="john.doe@gmail.com"
          />
          <AuthInput
            form={form}
            label="Password"
            name="password"
            disabled={loading}
            placeholder="******"
            type="password"
          />
          <p className="text-xs text-end">
            <Link href="/auth/register" className="text-sky-600">
              Forgot Password?
            </Link>
          </p>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
          <div>
            <p className="text-sm text-end">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-sky-600">
                Register
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthForm>
  );
};

export default LoginForm;
