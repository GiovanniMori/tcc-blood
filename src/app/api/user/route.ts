import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = "force-dynamic"

export async function POST() {
  const { userId, user } = auth()

  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }
  if (user) {
    const userPrisma = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        cpf: "12345678910",
        gender: `PREFER_NOT_TO_SAY`,
        id: user.id,
      },
    })
    return NextResponse.json({ userPrisma })
  }
}
