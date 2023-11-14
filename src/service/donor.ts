import prisma from "@/lib/prisma";
import { donorWithUser } from "@/types/donorWithUser";
import { currentUser } from "@clerk/nextjs/server";

export async function getDonor(): Promise<donorWithUser | null> {
  const user = await currentUser();
  if (user) {
    try {
      const userDb = await prisma.donor.findUniqueOrThrow({
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
