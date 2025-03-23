"use client";

import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AtomIcon, ChevronRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";

export const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "Manage Inventories",
      "Track Stock",
      "Stay Organized",
      "Publish & Share",
      "Streamline Workflow",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        duration: 0.5,
      }}
      className="max-w-[100dvw] overflow-x-hidden min-h-dvh flex items-center justify-center"
    >
      <div className="max-w-dvw overflow-x-hidden">
        <Spotlight />
      </div>
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div>
          <Badge className="bg-transparent text-foreground border-2 border-border pl-2 flex items-center justify-center gap-3">
            <AtomIcon className="animate-spin text-blue-600" /> We're live
          </Badge>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
            <span className="block font-bold text-foreground font-sans">
              Effortless Inventory Management for Everyone
            </span>
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Create, manage, and share your inventory seamlessly. Keep track of
            your products, publish inventories, and let others explore them—all
            in one place.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button asChild size="lg" className="gap-4">
            <Link href={"/auth/login"}>
              Get Started <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
