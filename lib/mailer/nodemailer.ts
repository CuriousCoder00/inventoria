"use server";
import { generatePasswordResetToken, getVerificationTokenByEmail } from "@/app/actions/utils";
import fs from "fs";
import nodemailer from "nodemailer";
const verificationMailHTML = fs.readFileSync("public/templates/email-verification.html", "utf-8");

export async function sendVerificationMail(email: string, name: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const verificationToken = await getVerificationTokenByEmail(email);
    const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${verificationToken?.token}`;
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email address",
      html: verificationMailHTML.replace("{{ user_name }}", name).replace("{{verification_link}}", verificationLink),
    });
    return info;
  } catch (error: any) {
    return error.message;
  }
}

// export async function sendPasswordResetLink(email: string, name: string) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: process.env.EMAIL_SERVICE,
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//     const passwordResetToken = await generatePasswordResetToken(email);
//     const resetPasswordLink =
//       `${process.env.NEXTAUTH_URL}/auth/new-password?token=${passwordResetToken?.token}` ||
//       "";
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email || "",
//       subject: "Reset your password",
//       html: resetPassMailHTML(resetPasswordLink, name),
//     });
//     return info;
//   } catch (error: any) {
//     return error.message;
//   }
// }