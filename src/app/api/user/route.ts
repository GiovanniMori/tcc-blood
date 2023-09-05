import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"
import { userSchema } from "@/schemas/user"
import { currentUser } from "@clerk/nextjs/server"

const prisma = new PrismaClient()
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    const user = await currentUser()
    const data = userSchema.parse(await request.json())
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
