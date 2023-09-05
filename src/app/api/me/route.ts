import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()
export const dynamic = "force-dynamic"

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    })
    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ data: "Register" })
  }
}