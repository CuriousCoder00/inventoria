"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getNameInitial } from "@/lib/utils";
import { LucideLogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer w-8 h-8">
          <AvatarFallback className="bg-foreground text-background">
            {getNameInitial(session.data?.user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-4 z-10 bg-white text-black dark:bg-slate-950 dark:text-white pb-5">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="flex gap-3 items-center justify-start"
            href={`/account/${session.data?.user.email}`}
          >
            <User className="h-5 w-5" />
            <span className="text-sm">My Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut()}
        >
          <div className="flex items-center justify-start gap-3">
            <LucideLogOut className="size-5 pl-1" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
