import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";
import { getUser } from "@/service/user";
import { redeemSchema } from "@/schemas/reedem";
import generateVoucherCode from "@/utils/generate-voucher";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const data = redeemSchema.parse(await request.json());
    const reward = await prisma.reward.findFirstOrThrow({
      where: { id: data.id },
      select: { points: true },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { points: user.points - reward.points },
    });
    const voucher = await prisma.voucher.create({
      data: {
        user: { connect: { id: user.id } },
        Reward: { connect: { id: data.id } },
        code: generateVoucherCode(10), // generate a random string of length 10
      },
    });

    return NextResponse.json(voucher);
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}