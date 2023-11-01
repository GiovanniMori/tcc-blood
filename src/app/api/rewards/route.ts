import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";
import { rewardSchema } from "@/schemas/reward";
import { getUser } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page_size = searchParams.get("page_size");
  const page_number = searchParams.get("page_number");

  const reward = await prisma.reward.findMany({
    skip: Number(page_number) * Number(page_size),
    take: Number(page_size),
  });
  const count = await prisma.reward.count();

  const totalPages = Math.ceil(Number(count) / Number(page_size));
  return NextResponse.json({
    data: reward,
    status: 200,
    totalPage: totalPages,
  });
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    const data = rewardSchema.parse(await request.json());
    if (user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 });
    }
    const reward = await prisma.reward.create({
      data: {
        description: data.description,
        points: data.points,
        imageUrl: data.imageUrl,
        name: data.name,
        vouchers: {
          create: data.vouchers,
        },
      },
    });
    return NextResponse.json(reward);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
