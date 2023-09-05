import { auth } from "@clerk/nextjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function useDbUser() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  try {
    const dbUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    })
    return dbUser
  } catch {
    return false
  }
}
