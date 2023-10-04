import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";
import { currentUser } from "@clerk/nextjs/server";
import { generateNickname } from "@/utils/generate-nickname";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { Hemocenter } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page_size = searchParams.get("page_size");
  const page_number = searchParams.get("page_number");

  const [hemocenters, count] = await Promise.all([
    prisma.hemocenter.findMany({
      skip: Number(page_number) * Number(page_size),
      take: Number(page_size),
    }),
    prisma.hemocenter.count(),
  ]);
  const totalPages = Math.ceil(Number(count) / Number(page_size));

  const response: PaginatedResponse<Hemocenter> = {
    data: hemocenters,
    totalRecords: count,
    totalPage: totalPages,
  };
  return NextResponse.json(response);
}
