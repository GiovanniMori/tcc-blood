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
import { getUser } from "@/service/user";
import { getDonor } from "@/service/donor";

export default async function Home() {
  const donor = await getDonor();
  const hemocenters = await prisma.hemocenter.findMany();
  const appointments = await prisma.appointment.findMany({});
  const disabledDates: Date[] = [];

  const appointmentsByHour: { [hour: number]: number } = {};
  for (let i = 7; i <= 23; i++) {
    appointmentsByHour[i] = 0;
  }

  appointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const hour = appointmentDate.getHours();
    appointmentsByHour[hour]++;
  });

  for (let i = 7; i <= 23; i++) {
    if (appointmentsByHour[i] >= 3) {
      // If there are 3 or more appointments scheduled for this hour, it is not available
      disabledDates.push(new Date(0, 0, 0, i));
    }
  }

  return (
    <main className="flex flex-col gap-8">
      <Booking
        donor={donor!}
        hemocenters={hemocenters}
        disabledDates={disabledDates}
      />
    </main>
  );
}
