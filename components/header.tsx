"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";
import UserProfile from "./user-profile";
export default function Header() {
  const session = useSession();
  return (
    <header className="fixed z-50 inset-x-0 w-full flex items-center justify-between p-2 bg-background dark:bg-black border-b-2 md:px-20 px-4">
      <Link href={"/"} className="text-md font-bold">
        Inventoria
      </Link>
      <nav className="flex items-center space-x-4">
        <div className="">
          {session.data?.user ? (
            <div className="flex items-center space-x-3">
              <UserProfile />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/register">Get Started</Link>
              {/* <ModeToggle /> */}
              <ThemeToggle />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
