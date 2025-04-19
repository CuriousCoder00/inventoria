"use client";
import { passwordResetMail } from "@/actions/auth/forgot-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof ForgotPasswordInput, e.target.value);
  };
  const handleResetLink = async (data: ForgotPasswordInput) => {
    try {
      setLoading(true);
      const res = await passwordResetMail(data.email);
      if (res.success) {
        toast.success(res.message, {
          duration: 3000,
        });
      } else {
        toast.error(res.message, {
          duration: 3000,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error sending reset password link:", error);
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <div className="min-w-dvw min-h-dvh flex items-center justify-center">
        <div className="flex flex-col items-start justify-start max-w-md">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-sm text-muted-foreground mb-5 hover:text-primary hover:underline"
          >
            <LucideArrowLeft size={16} /> Back to login
          </Link>
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-md text-muted-foreground">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
          <form
            onSubmit={form.handleSubmit(handleResetLink)}
            className="flex flex-col space-y-4 mt-6 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="email"
                      {...field}
                      onChange={onValueChange}
                      placeholder="john.doe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 text-end" />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              type="submit"
              className="w-full mt-4 cursor-pointer"
            >
              Send link to email
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
};

export default ForgotPasswordPage;
