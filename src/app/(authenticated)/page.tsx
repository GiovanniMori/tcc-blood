"use client";
import FirstSection from "@/components/homepage/first-section";
import Goal from "@/components/homepage/goal";

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <FirstSection />
      <Goal />
    </main>
  );
}
