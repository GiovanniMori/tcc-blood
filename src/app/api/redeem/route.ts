import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";
import { getUser } from "@/service/user";
import { redeemSchema } from "@/schemas/reedem";
import generateVoucherCode from "@/utils/generate-voucher";
import { getDonor } from "@/service/donor";

export async function POST(request: Request) {
  const donor = await getDonor();

  if (!donor) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const data = redeemSchema.parse(await request.json());
    const reward = await prisma.reward.findFirstOrThrow({
      where: { id: data.id },
      select: { points: true },
    });
    // points: user.points - reward.points
    await prisma.user.update({
      where: { id: donor.id },
      data: {
        donor: {
          update: {
            where: {
              id: donor.id,
            },
            data: {
              points: donor.points - reward.points,
            },
          },
        },
      },
    });
    // const voucher = await prisma.voucher.create({
    //   data: {
    //     donor: { connect: { id: user.id } },
    //     Reward: { connect: { id: data.id } },
    //     code: generateVoucherCode(10), // generate a random string of length 10
    //   },
    // });

    return NextResponse.json(true);
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
