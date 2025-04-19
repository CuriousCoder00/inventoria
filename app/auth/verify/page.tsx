"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { verifyEmail } from "@/actions/auth/verify-email";
import { toast } from "sonner";
const VerifyEmailPage = () => {
  const [loading, setLoading] = React.useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleVerification = async (token: string) => {
    try {
      const res = await verifyEmail(token);
      if (res.success) {
        toast.success(res.message, {
          duration: 3000,
        });
        setTimeout(() => {
          setLoading(false);
          router.push("/auth/login");
        }, 7000);
      } else {
        toast.error(res.message, {
          duration: 3000,
        });
        setLoading(false);
      }
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      console.log(error);
      toast.error("Something went wrong", {
        duration: 3000,
      });
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const token = searchParams.get("token") as string;
    if (!token) {
      toast.error("Invalid token", {
        duration: 3000,
      });
      setLoading(false);
      return;
    }
    handleVerification(token);
  }, [searchParams]);
  return (
    <div className="min-w-dvw min-h-dvh flex items-center justify-center w-full h-full">
      {loading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={loading}
          duration={1000}
        />
      )}
    </div>
  );
};

export default VerifyEmailPage;

const loadingStates = [
  { text: "Fetching supplier details..." },
  { text: "Generating real-time insights..." },
  { text: "Setting up inventory alerts..." },
  { text: "Connecting to order processing system..." },
  { text: "Preparing dashboard..." },
  { text: "Verifying email..." },
  { text: "Finalizing setup..." },
];
