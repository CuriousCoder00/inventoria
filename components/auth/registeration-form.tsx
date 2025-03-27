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
import { EyeClosed, EyeIcon } from "lucide-react";
import { Register } from "@/app/actions/auth/register";
const RegistrationForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
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
      setLoading(false)
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthForm form={form}>
      <form className="my-8 flex flex-col space-y-4" onSubmit={form.handleSubmit(onRegister)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
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
                    {showPassword ? <EyeClosed/> : <EyeIcon />}
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
                    {...field}
                    onChange={onValueChange}
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <Button
                    variant={"ghost"}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeClosed/> : <EyeIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-400 text-end" />
            </FormItem>
          )}
        />

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
      </form>
    </AuthForm>
  );
};

export default RegistrationForm;
