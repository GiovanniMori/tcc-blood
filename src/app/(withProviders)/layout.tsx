import { PrismaClient } from "@prisma/client"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { useDbUser } from "@/hooks/useDbUser"
const prisma = new PrismaClient()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useDbUser()
  !user && redirect("/register")
  return <>{children}</>
}
