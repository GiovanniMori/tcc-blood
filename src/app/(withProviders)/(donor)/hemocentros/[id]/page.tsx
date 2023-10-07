import prisma from "@/lib/prisma";
import { BellRing } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const hemocenter = await prisma.hemocenter.findUnique({
    where: {
      id: "819e4461-6dfe-4b80-a986-0010aa0bbcae",
    },
    include: {
      bloodTypeStocks: true,
    },
  });
  // if (!hemocenter) {
  //   redirect("/hemocentros");
  // }
  return <main className="flex flex-col gap-8"></main>;
}
