import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";

export async function POST(request: Request) {
  try {
    const data = registerSchema.parse(await request.json());

    return NextResponse.json({ a: "a" });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
