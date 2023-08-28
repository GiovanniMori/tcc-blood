import { buttonVariants } from "@/components/ui/button"
import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BloodLink Login",
  description: "",
}
export default function Page() {
  return <SignIn />
}
