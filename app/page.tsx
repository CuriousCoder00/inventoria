"use client"
import Header from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <Hero />
      <hr className="max-w-6xl mx-auto mb-12" />
    </div>
  );
}
