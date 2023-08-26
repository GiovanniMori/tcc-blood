"use client"
import { GithubIcon, HeartHandshake } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { ThemeModeToggle } from "../theme-mode-toggle"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import UserNavbar from "../user-navbar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import NavbarLinks from "./navbar-links"
import { Separator } from "../ui/separator"

export default function Navbar() {
  return (
    <div className="px-6 py-3 flex items-center justify-between">
      <Sheet>
        <SheetTrigger className="flex md:hidden">
          <HeartHandshake />
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col gap-2">
          <SheetHeader>
            <SheetTitle className="flex gap-2 items-center">
              <HeartHandshake />
              BloodLink
            </SheetTitle>
          </SheetHeader>

          <div className="px-8">
            <NavbarLinks />
            <UserNavbar />
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="hidden md:flex gap-2">
        <HeartHandshake />
        BloodLink
      </Link>
      <div className="flex items-center gap-10 ">
        <div className="hidden md:flex">
          <NavbarLinks />
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
