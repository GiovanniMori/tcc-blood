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
  const user = await getUser();

  if (user) {
    !user && redirect("/register");
  }

  return <>{children}</>;
}
