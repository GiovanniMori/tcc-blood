import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
interface AvailableDaysResponse {
  availableDays: string[];
}
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hemocenterId = searchParams.get("hemocenterId");

  if (!hemocenterId) {
    return NextResponse.json({
      status: 400,
      body: "Missing hemocenterId parameter",
    });
  }
  // const today = new Date();
  // const tenDaysLater = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);

  // const appointments = await prisma.appointment.findMany({
  //   where: {
  //     hemocenterId: hemocenterId,
  //     AND: [
  //       {
  //         date: {
  //           gte: today.toISOString(),
  //         },
  //       },
  //       {
  //         date: {
  //           lt: tenDaysLater.toISOString(),
  //         },
  //       },
  //     ],
  //   },
  //   select: {
  //     date: true,
  //   },
  // });

  // const availableDays = new Set();
  // for (let i = 0; i < 10; i++) {
  //   const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
  //   availableDays.add(date.toISOString().slice(0, 10));
  // }

  // for (const appointment of appointments) {
  //   const date = new Date(appointment.date);
  //   const dateString = date.toISOString().slice(0, 10);
  //   availableDays.delete(dateString);
  // }

  // const response: AvailableDaysResponse = {
  //   availableDays: Array.from(availableDays),
  // };
  // return NextResponse.json(response);
}
