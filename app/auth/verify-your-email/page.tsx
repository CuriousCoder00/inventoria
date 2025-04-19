"use client";
import { resendVerificationEmail } from "@/actions/auth/verify-email";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const VerifyRequestPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const handleResendMail = async () => {
    try {
      setLoading(true);
      const res = await resendVerificationEmail(email as string);
      if (res.success) {
        toast.success(res.message, {
          duration: 3000,
        });
        setLoading(false);
      } else {
        toast.error(res.message, {
          duration: 3000,
        });
        setLoading(false);
      }
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      toast.error(error.message || "Something went wrong..", {
        duration: 3000,
      });
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const email = searchParams.get("email");
    if (email) setEmail(email);
  }, [searchParams]);
  return (
    <div className="min-w-dvw min-h-dvh flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 max-w-md border border-border p-6 rounded-md shadow">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Verify Your Email Address
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          We have sent you an email with a verification link. Please check your
          inbox and click the link to verify your email address.
        </p>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          If you don&apos;t see the email, please check your spam folder or request a
          new verification email.
        </p>
        <div className="flex flex-col items-center justify-center gap-2 w-full mt-4">
          <Button variant="outline" className="w-full cursor-pointer" onClick={handleResendMail} disabled={loading}>
            {loading ? <BarLoader color="blue"/> :  "Resend"}
          </Button>
          <Button variant="link" className="cursor-pointer" onClick={() => router.push("/auth/login")}>
            Go Back To Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyRequestPage;
