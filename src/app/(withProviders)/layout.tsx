import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { useDbUser } from "@/hooks/server/useDbUser"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useDbUser()
  const userClerk = await currentUser()
  if (userClerk) {
    !user && redirect("/register")
  }
  return <>{children}</>
}
