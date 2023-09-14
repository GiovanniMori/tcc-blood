import { MainNav } from "./components/main-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

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

  if (userDb.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center">
          <MainNav className="mx-6" />
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
}
