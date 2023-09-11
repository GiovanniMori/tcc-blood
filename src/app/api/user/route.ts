import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prisma from "@/lib/prisma"
import { registerSchema } from "@/schemas/register"
import { currentUser } from "@clerk/nextjs/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    const user = await currentUser()
    const data = registerSchema.parse(await request.json())
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }
    if (user) {
      const userPrisma = await prisma.user.create({
        data: {
          name: data.name,
          email: user.emailAddresses[0].emailAddress,
          cpf: data.cpf.replaceAll(".", "").replaceAll("-", ""),
          gender: data.gender,
          id: user.id,
        },
      })
      return NextResponse.json({ userPrisma })
    }
    return NextResponse.json({ a: "a" })
  } catch (error: any) {
    return new Response(error.message, { status: 400 })
  }
}
