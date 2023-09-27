import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page_size = searchParams.get("page_size");
  const page_number = searchParams.get("page_number");

  const users = await prisma.user.findMany({
    skip: Number(page_number) * Number(page_size),
    take: Number(page_size),
  });
  const count = await prisma.user.count();

  const totalPages = Math.ceil(Number(count) / Number(page_size));
  return NextResponse.json({
    data: users,
    status: 200,
    totalPage: totalPages,
  });
}
// ...

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const data = registerSchema.parse(await request.json());
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (user) {
      const userPrisma = await prisma.user.create({
        data: {
          id: user.id,
          name: data.name,
          email: user.emailAddresses[0].emailAddress,
          Donor: {
            create: {
              cpf: data.cpf.replaceAll(".", "").replaceAll("-", ""),
              gender: data.gender,
            },
          },
        }, // add type assertion here
      });
      return NextResponse.json(userPrisma);
    }
    return NextResponse.json({ a: "a" });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
