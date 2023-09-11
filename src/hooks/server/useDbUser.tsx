import { auth } from "@clerk/nextjs"
import prisma from "@/lib/prisma"

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
