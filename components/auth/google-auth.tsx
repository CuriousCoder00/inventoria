"use client"
import React from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import BottomGradient from "../bottom-gradient";
import { GoogleLogin } from "@/actions/auth/google-login";

const GoogleAuth = () => {
    return (
        <div className="flex items-center justify-center">
            <button
                className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] text-center"
                onClick={GoogleLogin}
            >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Continue with Google
                </span>
                <BottomGradient />
            </button>
        </div>
    );
};

export default GoogleAuth;
