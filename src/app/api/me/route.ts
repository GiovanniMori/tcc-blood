import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        Donor: true,
        Sponsor: true,
      },
    });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ data: "Register" });
  }
}
