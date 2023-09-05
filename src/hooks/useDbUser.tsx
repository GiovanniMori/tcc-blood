"use client"
import { UserContext } from "@/contexts/UserContext"
import { useContext } from "react"

export function useDbUser() {
  const value = useContext(UserContext)
  return value
}
