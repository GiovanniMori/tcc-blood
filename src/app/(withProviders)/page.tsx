"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TbHeartHandshake, TbPigMoney } from "react-icons/tb"
import colors from "tailwindcss/colors"
import { GiDrop } from "react-icons/gi"
import { MdCardGiftcard } from "react-icons/md"
import { IoIosStats } from "react-icons/io"
import { Button } from "@/components/ui/button"
import FirstSection from "@/components/homepage/first-section"
import Goal from "@/components/homepage/goal"

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <FirstSection />
      <Goal />
    </main>
  )
}
