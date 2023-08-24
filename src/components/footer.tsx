import Link from "next/link"
import { Home, User } from "lucide-react"
import { ReactNode } from "react"

const ICON_SIZE = 20
export default function Footer() {
  return (
    <div className="sm:hidden sticky flex bottom-0 w-full bg-input gap-4">
      <FooterLink href="/">
        <Home size={ICON_SIZE} />
      </FooterLink>
      <FooterLink href="/login">
        <User size={ICON_SIZE} />
      </FooterLink>
    </div>
  )
}

interface FooterProps {
  href: string
  children: ReactNode
}
function FooterLink({ href, children }: FooterProps) {
  return (
    <Link
      href={href}
      className="w-full p-3 items-center justify-center flex flex-col "
    >
      {children}
    </Link>
  )
}
