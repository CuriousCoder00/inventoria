"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import { Store } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";

export function SidebarMain() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Inventories",
      href: "/inv",
      icon: (
        <Store className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session?.data?.user;
  console.log(user);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <>
            <Logo />
          </>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) =>
              link.label !== "Logout" ? (
                <SidebarLink key={idx} link={link} />
              ) : (
                <Link
                  key={idx}
                  href="#"
                  onClick={() => signOut()}
                  className="flex items-center justify-start gap-2 py-2 text-neutral-700 dark:text-neutral-200"
                >
                  {link.icon}
                  <span className="text-sm whitespace-pre">{link.label}</span>
                </Link>
              )
            )}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: user?.firstName + " " + user?.lastName,
              href: "#",
              icon: profileAvatar({
                firstName: user?.firstName ? user?.firstName : "John",
                lastName: user?.lastName ? user?.lastName : "Doe",
                avatar: user?.avatar,
              }),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const profileAvatar = ({
  firstName,
  lastName,
  avatar,
}: {
  firstName: string;
  lastName: string;
  avatar: string;
}) => {
  return (
    <Avatar>
      <AvatarImage src={avatar} />
      <AvatarFallback>
        {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Inventoria
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};
