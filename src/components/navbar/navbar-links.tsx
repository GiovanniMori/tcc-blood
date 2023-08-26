import Link from "next/link"
import React from "react"

export default function NavbarLinks() {
  return (
    <>
      <Link
        href="/"
        prefetch={false}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Doacoes
      </Link>
    </>
  )
}
