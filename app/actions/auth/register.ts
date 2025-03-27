"use server";

import bcryptjs from "bcryptjs";
import { RegisterInput } from "@/lib/validations/auth.validation";
import { generateVerificationToken, getUserByEmail } from "../utils";
import prisma from "@/lib/prisma";
import { sendVerificationMail } from "@/lib/mailer/nodemailer";

export const Register = async (data: RegisterInput) => {
  try {
    const { email, firstName, lastName, password } = data;
    console.log(email, firstName, lastName, password);
    const userExists = await getUserByEmail(email);
    console.log(userExists);
    if (userExists){
      return { success: false, code: 400, message: "User already exists" };
    }
    // Hash password
    const hashedPassword = await bcryptjs.hash(
      password,
      await bcryptjs.genSalt(10)
    );
    // Register user
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationMail(verificationToken.email, firstName);
    return { success: true, code: 200, message: "Verification Email Sent." };
  } catch (error: any) {
    return { success: false, code: 500, message: error.message || "Internal Server Error" };
  }
};