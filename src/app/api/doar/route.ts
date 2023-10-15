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
    console.log(data)

    const hemocenter = await prisma.hemocenter.findMany({
      where({id: data.hemocenterId})
    })

    const appointment = await prisma.appointment.create({
      data : {
        date: data.dateTime,
        donorUserId: data.donorId,
        hemocenter: data.hemocenter,
        hemocenterId: data.hemocenterId
      }
    });
    // const date = await prisma.appointment.findUnique({
    //   where: { date: data.date},
    // });
    return NextResponse.json(appointment);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
