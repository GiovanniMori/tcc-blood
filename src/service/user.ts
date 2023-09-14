import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

export async function getUser(): Promise<User | null> {
  const user = await currentUser();
  if (user) {
    const userDb = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });
    return userDb;
  }

  return null;
}
