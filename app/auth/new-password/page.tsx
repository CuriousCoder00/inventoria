"use client";
import { createNewPassword } from "@/actions/auth/forgot-password";
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
  NewPasswordInput,
  newPasswordSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff, LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const NewPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = React.useState<string | null>(null);
  const form = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof NewPasswordInput, e.target.value);
  };

  const handlePasswordChange = async (data: NewPasswordInput) => {
    try {
      setLoading(true);
      const res = await createNewPassword(data.password, token as string);
      if (res.success) {
        toast.success(res.message, {
          duration: 3000,
        });
        router.push("/auth/login");
      } else {
        toast.error(res.message, {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error setting new password:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    } else {
      router.push("/auth/login");
    }
  }, [searchParams, router]);

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
          <h1 className="text-2xl font-bold text-primary">
            Create New Password
          </h1>
          <p className="text-md text-muted-foreground">
            Enter a new password for your account. Make sure to choose a strong
            password that you haven&apos;t used before.
          </p>
          <form
            className="flex flex-col space-y-4 mt-6 w-full"
            onSubmit={form.handleSubmit(handlePasswordChange)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        disabled={loading}
                        {...field}
                        onChange={onValueChange}
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                      />
                      <Button
                        disabled={loading}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        disabled={loading}
                        {...field}
                        onChange={onValueChange}
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <Button
                        disabled={loading}
                        variant={"ghost"}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <EyeOff /> : <EyeIcon />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 text-end" />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="w-full mt-4">
              {loading ? "Loading..." : "Create New Password"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              By creating a new password, you agree to our{" "}
              <Link href="/terms" className="text-sky-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-sky-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Form>
  );
};

export default NewPassword;
