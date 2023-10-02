import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Donor } from "@prisma/client";

export async function getDonor(): Promise<Donor | null> {
  const user = await currentUser();
  if (user) {
    try {
      const userDb = await prisma.donor.findUniqueOrThrow({
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
