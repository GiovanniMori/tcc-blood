import prisma from "@/lib/prisma";
import { bloodDonationSchema } from "@/schemas/donation";
import { getUser } from "@/service/user";
import { BloodType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const teste = await prisma.hemocenter.findFirst();
  return NextResponse.json(teste);
}
