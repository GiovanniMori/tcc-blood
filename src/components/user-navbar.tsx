import {
  SignOutButton,
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
import { getUser } from "@/service/user";
import { Separator } from "./ui/separator";

export default async function UserNavbar() {
  const user = await getUser();
  return (
    <div className="hidden sm:flex">
      {user && (
        <>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={user!.name} />
                <AvatarFallback>{user!.name[0]}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{user!.name}</h4>
                  <p className="text-sm text-muted-foreground">{user!.email}</p>
                </div>
                <Link href={"/configuracoes"}>Configurações</Link>
                <Link href={"/configuracoes/cupons"}>Cupons</Link>
                <Separator />
                <div className="grid gap-2">
                  <SignOutButton>
                    <Button variant="default">Sair</Button>
                  </SignOutButton>
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
