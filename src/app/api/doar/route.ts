import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data = await req.json();
  
  try {
    const appointment = await prisma.appointment.create({
      data : {
        date: data.dateTime,
        donorUserId: data.donorId,
        hemocenter: data.hemocenter,
        hemocenterId: data.hemocenterId
      }
    });
    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
