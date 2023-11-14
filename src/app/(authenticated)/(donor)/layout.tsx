import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (user) {
    const donor = await prisma.donor.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!donor) {
      redirect("/regis  ter");
    }
  }
  return <>{children}</>;
}
