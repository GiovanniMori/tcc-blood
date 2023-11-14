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
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import prisma from "@/lib/prisma";
import { getUser } from "@/service/user";
import { Separator } from "../ui/separator";
import { getDonor } from "@/service/donor";

export default async function UserNavbar() {
  const donor = await getDonor();
  return (
    <div className="flex flex-col">
      {donor && (
        <>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={donor!.user.name} />
                <AvatarFallback>{donor!.user.name[0]}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    {donor.user!.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {donor.user!.email}
                  </p>
                </div>
                {donor && (
                  <Link href={`/perfil/${donor.nickname}`}>Perfil</Link>
                )}
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
      {!donor && (
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
