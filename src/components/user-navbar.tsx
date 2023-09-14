import {
  SignedIn,
  SignedOut,
  auth,
  currentUser,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import prisma from "@/lib/prisma";

export default async function UserNavbar() {
  const user = await currentUser();
  const userDb = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  });
  return (
    <div className="hidden sm:flex">
      {userDb && (
        <>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.firstName ? user.firstName[0] : ""}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    {user?.firstName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.emailAddresses[0].emailAddress}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button variant="default">Sair</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
      {!user && (
        <div className=" gap-2 hidden md:flex">
          <Button variant="secondary" asChild>
            <Link href={"/sign-in"}>Entrar</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href={"/sign-up"}>Cadastrar</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
