"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken, getUserByEmail } from "../utils";
import { LoginInput } from "@/lib/validations/auth.validation";

export const Login = async (data: LoginInput) => {
  const existingUser = await getUserByEmail(data.email);

  if (!existingUser) return { success: false, message: "Invalid credentials" };
  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email);
    return { success: false, message: "Please check your mail for verification.", code: 400, warn: true };
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: existingUser.firstVisit ? "/onboarding" : "dashboard"
    });
    return { success: true, message: "Login successful", code: 200 };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials", code: 400 };
        default:
          return { success: false, message: "Something went wrong", code: 500 };
      }
    }
    throw error;
  }
};