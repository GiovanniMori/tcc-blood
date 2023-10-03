import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page_size = searchParams.get("page_size");
  const page_number = searchParams.get("page_number");
  const user = searchParams.get("user");

  const users = await prisma.donor.findMany({
    where: {
      OR: [
        {
          nickname: {
            contains: user || "",
          },
        },
        {
          user: {
            name: {
              equals: user || "",
            },
          },
        },
      ],
    },
    skip: Number(page_number) * Number(page_size),
    take: Number(page_size),
  });
  const count = await prisma.donor.count();
  const totalPages = Math.ceil(Number(count) / Number(page_size));
  return NextResponse.json({
    data: users,
    status: 200,
    totalPage: totalPages,
  });
}
