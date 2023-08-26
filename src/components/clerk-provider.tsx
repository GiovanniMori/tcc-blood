"use client"
import { ClerkProvider } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import React from "react"
import { dark } from "@clerk/themes"
import { ptBR } from "@clerk/localizations"

export default function CustomClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : dark,
      }}
      localization={ptBR}
    >
      {children}
    </ClerkProvider>
  )
}
