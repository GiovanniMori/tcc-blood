"use client"
import { GithubIcon, HeartHandshake } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "./ui/button"
import { ThemeModeToggle } from "./theme-mode-toggle"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import UserNavbar from "./user-navbar"

export default function Navbar() {
  return (
    <div className="px-6 py-3 flex items-center justify-between">
      <div className="flex gap-2">
        <HeartHandshake />
        BloodLink
      </div>
      <div className="flex items-center gap-16">
        <div>
          <Link
            href="/"
            prefetch={false}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Doacoes
          </Link>
        </div>
        <div className="flex gap-2">
          <UserNavbar />
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com/GiovanniMori/tcc-blood">
              <GithubIcon className="absolute h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Página no Github</span>
            </Link>
          </Button>
          <ThemeModeToggle />
        </div>
      </div>
    </div>
  )
}
