import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hemocenterId = searchParams.get("hemocenterId");
  const date = searchParams.get("date");
  const hour = searchParams.get("hour");

  if (!hemocenterId || !date || !hour) {
    return NextResponse.json({
      status: 400,
      body: "Missing required parameters",
    });
  }

  // const appointment = await prisma.appointment.findFirst({
  //   where: {
  //     hemocenterId: hemocenterId,
  //     date: new Date(`${date}T${hour}:00:00.000Z`),
  //   },
  // });

  // const response: HourAvailabilityResponse = {
  //   available: !appointment,
  // };
  // return NextResponse.json(response);
}
