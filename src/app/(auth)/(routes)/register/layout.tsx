<<<<<<< HEAD
import prisma from "@/lib/prisma";
import { getUser } from "@/service/user";
import { currentUser } from "@clerk/nextjs/server";
=======
import { getUser } from "@/service/user";
>>>>>>> develop
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const user = await getUser();

  if (user) {
    user && redirect("/");
  }

=======
  // const user = await getUser();

  // if (user) {
  //   !user && redirect("/register");
  // }
>>>>>>> develop
  return <>{children}</>;
}
