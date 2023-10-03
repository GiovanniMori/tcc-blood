import { redirect } from "next/navigation";
import { getUser } from "@/service/user";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      redirect("/register");
    }
  }

  return <>{children}</>;
}
