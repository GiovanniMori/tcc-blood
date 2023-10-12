import { Booking } from "@/components/booking";
import prisma from "@/lib/prisma";
import { getDonor } from "@/service/donor";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { Hemocenter } from "@prisma/client";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export default async function Home() {
  const donor = await getDonor();

  return (
    <main className="flex flex-col gap-8">
      <Booking donor={donor!} />
    </main>
  );
}
