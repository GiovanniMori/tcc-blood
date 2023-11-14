import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";
import { currentUser } from "@clerk/nextjs/server";
import { generateNickname } from "@/utils/generate-nickname";
import { getDonor } from "@/service/donor";
import { getUser } from "@/service/user";

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

export async function PATCH(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { id, name, email, userRole } = await request.json();
    if (id !== user.id && user.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 });
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role: user.role === "ADMIN" ? userRole : user.role,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    return new Response(error.message, { status: 400 });
  }
}

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
          donor: {
            create: {
              referralBy: data.referalBy,
              cpf: data.cpf.replaceAll(".", "").replaceAll("-", ""),
              gender: data.gender,
              nickname: generateNickname(user.emailAddresses[0].emailAddress),
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
