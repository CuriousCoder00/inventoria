"use client";
import React from "react";
import { Input } from "../ui/input";
import BottomGradient from "../bottom-gradient";
import { useForm } from "react-hook-form";
import {
  RegisterInput,
  registerSchema,
} from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "./auth-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { EyeOff, EyeIcon } from "lucide-react";
import { Register } from "@/actions/auth/register";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const RegistrationForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof RegisterInput, e.target.value);
  };

  const onRegister = async (data: RegisterInput) => {
    try {
      setLoading(true);
      const res = await Register(data);
      if (res.success) {
        toast.success(res.message, {
          description: res.desc,
          duration: 3000,
        });
        router.push("/auth/verify-your-email?email=" + data.email);
      } else {
        toast.error(res.message, {
          duration: 3000,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        duration: 3000,
      });
    }
  };

  return (
    <AuthForm form={form}>
      <div className="my-4 flex items-center gap-2 justify-start">
        Already have an account?{" "}
        <Link
          className="text-sm hover:underline text-sky-500"
          href={"/auth/login"}
        >
          Login
        </Link>
      </div>
      <div className="my-2 flex items-center justify-center gap-2">
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
        <span>OR</span>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
      </div>
      <form
        className="my-8 flex flex-col space-y-4"
        onSubmit={form.handleSubmit(onRegister)}
      >
        <h4 className="font-bold text-lg mb-4">Create Your Account</h4>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    onChange={onValueChange}
                    placeholder="John"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    onChange={onValueChange}
                    placeholder="Doe"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 text-end" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  {...field}
                  onChange={onValueChange}
                  placeholder="john.doe@gmail.com"
                  type="email"
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <EyeIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />

        <button
          disabled={loading}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
          type="submit"
        >
          {loading ? (
            <PropagateLoader color="#fff" size={10} />
          ) : (
            <>
              Create Account &rarr;
              <BottomGradient />
            </>
          )}
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
        <p className="text-sm text-muted-foreground text-center">
          By creating a new account, you agree to our{" "}
          <Link href="/terms" className="text-sky-500 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-sky-500 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </form>
    </AuthForm>
  );
};

export default RegistrationForm;
