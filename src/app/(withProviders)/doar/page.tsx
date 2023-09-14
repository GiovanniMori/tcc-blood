import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TbHeartHandshake, TbPigMoney } from "react-icons/tb";
import colors from "tailwindcss/colors";
import { GiDrop } from "react-icons/gi";
import { MdCardGiftcard } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { Button } from "@/components/ui/button";
import FirstSection from "@/components/homepage/first-section";
import Goal from "@/components/homepage/goal";
import { Donate } from "@/components/donate";
import { Booking } from "@/components/booking";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const hemocenters = await prisma.hemocenter.findMany();
  return (
    <main className="flex flex-col gap-8">
      <Booking user={dbUser!} hemocenters={hemocenters} />
    </main>
  );
}
