import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUser } from "@/service/user";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("page_size");
    const appointments = await prisma.appointment.findMany({
      where: {
        date: "Thu Sep 14 2023 17:18:11 GMT-0300 (Brasilia Standard Time)",
      },
    });
    return NextResponse.json({ appointments });
  } catch {
    return NextResponse.json({ data: "Register" });
  }
}
