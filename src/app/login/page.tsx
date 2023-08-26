import { ThemeModeToggle } from "@/components/theme-mode-toggle"
import { SignIn, SignUp } from "@clerk/nextjs"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn />
      <SignUp />
    </main>
  )
}
