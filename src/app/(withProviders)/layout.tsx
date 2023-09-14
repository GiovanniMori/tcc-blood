import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getUser } from "@/service/user";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (user) {
    const userDb = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (userDb) {
      !userDb && redirect("/register");
    }
  }

  return (
    <>
      {user && <>oi </>}
      {children}
    </>
  );
}
