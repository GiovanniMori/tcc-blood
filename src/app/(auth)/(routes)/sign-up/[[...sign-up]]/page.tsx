import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BloodLink Cadastro",
  description: "",
}
export default function Page() {
  return <SignUp />
}
