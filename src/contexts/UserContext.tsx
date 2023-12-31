"use client";
import { useContext, useState, useEffect, createContext } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

export const UserContext = createContext<{
  user: User | undefined | null;
  signOut: () => void;
}>({ user: undefined, signOut: () => {} });

export const UserContextProvider = ({ children }: any) => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const { data: user } = useQuery<User | null>(
    ["user", isSignedIn],
    async () => {
      const response = await fetch("/api/me");
      const data: User = await response.json();
      return data;
    },
    {
      enabled: isSignedIn,
      initialData: undefined,
    }
  );

  const value = {
    user,
    signOut: () => signOut(),
  };

  return (
    <UserContext.Provider value={value}>
      {user !== null && children}
    </UserContext.Provider>
  );
};
