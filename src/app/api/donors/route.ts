import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { Donor } from "@prisma/client";
import { donorWithUser } from "@/types/donorWithUser";
import { getDonor } from "@/service/donor";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page_size = searchParams.get("page_size");
  const page_number = searchParams.get("page_number");
  const user = searchParams.get("user");
  const donor = await getDonor();
  const donors = await prisma.donor.findMany({
    where: {
      // NOT: {
      //   user: {
      //     id: donor!.id,
      //   },
      // },
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
  const count = donors.length;
  const totalPages = Math.ceil(Number(count) / Number(page_size));

  const response: PaginatedResponse<Donor> = {
    data: donors,
    totalRecords: count,
    totalPage: totalPages,
  };
  return NextResponse.json(response);
}
