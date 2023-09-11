import { MainNav } from "./components/main-nav"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

// use `prisma` in your application to read and write data in your DB
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  const userDb = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  })
  console.log(user?.id)

  if (userDb?.role === "ADMIN") {
    // User is an admin
  } else {
    redirect("/")
    // User is not an admin
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
  )
}
