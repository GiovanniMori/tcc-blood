import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUser } from "@/service/user";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { date } = await request.json();
    const appointments = await prisma.appointment.findMany({
      where: {
        date,
        donorUserId: user.id,
      },
    });
    return NextResponse.json({ appointments });
  } catch {
    return NextResponse.json({ data: "Register" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { hemocenterId, date } = await request.json();
    const appointment = await prisma.appointment.create({
      data: {
        hemocenter: { connect: { id: hemocenterId } },
        donor: { connect: { id: user.id } },
        date,
      },
    });
    return NextResponse.json({ appointment });
  } catch {
    return NextResponse.json("Failed to create appointment");
  }
}
