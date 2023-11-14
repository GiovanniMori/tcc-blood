import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Sponsor } from "@prisma/client";

export async function getSponsor(): Promise<Sponsor | null> {
  const user = await currentUser();
  if (user) {
    try {
      const userDb = await prisma.sponsor.findUniqueOrThrow({
        where: {
          id: user.id,
        },
        include: {
          user: true,
        },
      });
      return userDb;
    } catch {
      return null;
    }
  }
  return null;
}
