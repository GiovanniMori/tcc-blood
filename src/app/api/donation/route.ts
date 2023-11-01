import prisma from "@/lib/prisma";
import { bloodDonationSchema } from "@/schemas/donation";
import { getUser } from "@/service/user";
import { BloodType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await getUser();
    const data = bloodDonationSchema.parse(await request.json());
    if (user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 });
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 41);
    const response = await prisma.bloodDonation.create({
      data: {
        donorId: data.donorId,
        hemocenterId: data.hemocenterId,
        bloodType: data.bloodType as BloodType,
        volume: data.volume,
        expiration: expirationDate,
        appointment: { connect: { id: data.appointmentId } },
      },
    });
    return NextResponse.json(response);
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
