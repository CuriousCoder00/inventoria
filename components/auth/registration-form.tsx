import {
  userSignupSchema,
  UserSignupInput,
} from "@/lib/validations/user.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "./auth-form";
import { AuthInput } from "./auth-input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { Form } from "../ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);
  const [tab, setTab] = useState<"1" | "2">("1");
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<UserSignupInput>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signup = async (data: UserSignupInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          password: data.password,
        }),
      });
      const result = await res.json();
      console.log(result);
      if ("message" in result) {
        toast({
          title: result.message,
        });
        form.reset();
        router.replace("/auth/login");
      } else {
        toast({
          title: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsFormEmpty(
      !form.watch("name") ||
        !form.watch("email") ||
        !form.watch("password") ||
        !form.watch("confirmPassword")
    );
  }, [form.watch()]);
  return (
    <AuthForm loading={loading}>
      <Form {...form}>
        <form
          className="flex flex-col w-full gap-4 my-4"
          onSubmit={form.handleSubmit(signup)}
        >
          {tab === "1" && (
            <>
              <AuthInput
                form={form}
                label="Full Name"
                name="name"
                disabled={loading}
                placeholder="John Doe"
              />
              <AuthInput
                form={form}
                label="Email Address"
                name="email"
                disabled={loading}
                placeholder="john.doe@gmail.com"
              />
              <div className="flex items-center justify-end">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setTab("2")}
                  type="button"
                >
                  Next
                </Button>
              </div>
              <Button disabled={loading || isFormEmpty} type="submit" className="w-full">
                {loading ? <Loader className="animate-spin" /> : "Register"}
              </Button>
            </>
          )}
          {tab === "2" && (
            <>
              <AuthInput
                form={form}
                label="Password"
                name="password"
                disabled={loading}
                placeholder="******"
                type="password"
              />
              <AuthInput
                form={form}
                label="Confirm Password"
                name="confirmPassword"
                disabled={loading}
                placeholder="******"
                type="password"
              />
              <div className="flex items-center justify-between">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setTab("1")}
                  type="button"
                >
                  Previous
                </Button>
              </div>
              <Button disabled={loading || isFormEmpty} type="submit" className="w-full">
                {loading ? <Loader className="animate-spin" /> : "Register"}
              </Button>
            </>
          )}
          <div>
            <p className="text-sm text-end">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-sky-600">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthForm>
  );
};

export default RegistrationForm;
