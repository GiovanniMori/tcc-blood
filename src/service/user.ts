import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

export async function getUser(): Promise<User | null> {
  const user = await currentUser();
  if (user) {
    try {
      const userDb = await prisma.user.findUniqueOrThrow({
        where: {
          id: user.id,
        },
      });
      return userDb;
    } catch {
      return null;
    }
  }

  return null;
}
