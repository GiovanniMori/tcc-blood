import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

export async function getUser(): Promise<User> {
  const user = await currentUser();
  const userDb = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  });
  return userDb;
}
