import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { appointmentDonorWithUser } from "@/types/donorWithUser";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page_size = searchParams.get("page_size");
    const page_number = searchParams.get("page_number");

    const data = await prisma.appointment.findMany({
      skip: Number(page_number) * Number(page_size),
      take: Number(page_size),
      include: {
        donor: {
          include: {
            user: true,
          },
        },
      },
    });
    const count = await prisma.appointment.count();
    const totalPages = Math.ceil(Number(count) / Number(page_size));
    const response: PaginatedResponse<appointmentDonorWithUser> = {
      data,
      totalRecords: count,
      totalPage: totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
