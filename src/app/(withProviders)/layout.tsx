import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getUser } from "@/service/user";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userDb = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  });
  if (userDb) {
    !userDb && redirect("/register");
  }
  return <>{children}</>;
}
