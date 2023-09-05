import { redirect } from "next/navigation"
import { useDbUser } from "@/hooks/server/useDbUser"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await useDbUser()

  if (user) {
    user && redirect("/")
  }

  return <>{children}</>
}
