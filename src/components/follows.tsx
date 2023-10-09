"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { MoveRightIcon, UserCheck2, UserPlus2 } from "lucide-react";
import { Button } from "./ui/button";
import MakeFriends from "./make-friends";
import Link from "next/link";

type donor = Prisma.DonorGetPayload<{
  include: {
    user: true;
    followers: {
      include: {
        follower: {
          include: {
            user: true;
          };
        };
      };
    };
    following: {
      include: {
        following: {
          include: {
            user: true;
          };
        };
      };
    };
  };
}>;
export default function Follows({ donor }: { donor: donor }) {
  return (
    <Tabs defaultValue="Seguindo">
      <TabsList className="w-full">
        <TabsTrigger value="Seguindo" className="w-full">
          Seguindo
        </TabsTrigger>
        <TabsTrigger value="Seguidores" className="w-full">
          Seguidores
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Seguindo">
        <Card className="pt-6">
          <CardContent>
            {donor.following.length < 1 ? (
              <MakeFriends />
            ) : (
              donor.following
                .slice(0, 5)
                .map((follower) => (
                  <div key={follower.followingId}>
                    {follower.following.user.name}
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Seguidores">
        <Card>
          {donor.followers.length > 0 ? (
            <CardContent className="p-0">
              <div className="p-6">
                {donor.followers.slice(0, 5).map((follower) => (
                  <div
                    className="flex items-center gap-2 justify-between"
                    key={follower.followingId}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.pngs" />
                        <AvatarFallback>
                          {follower.follower.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{follower.follower.user.name}b</div>
                        <div>{follower.follower.user.name}</div>
                      </div>
                    </div>
                    {donor.following.some(
                      (following) =>
                        following.followingId === follower.followerId
                    ) ? (
                      <Button>
                        <UserCheck2 />
                      </Button>
                    ) : (
                      <Button>
                        <UserPlus2 />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Separator />
              <Dialog>
                <DialogTrigger className="p-4 flex justify-between w-full">
                  Ver mais
                  <MoveRightIcon />
                </DialogTrigger>
                <DialogContent>
                  <Tabs defaultValue="Segue">
                    <DialogHeader className="items-center">
                      <TabsList className="w-fit">
                        <TabsTrigger value="Segue">Segue</TabsTrigger>
                        <TabsTrigger value="Seguidores">Seguidores</TabsTrigger>
                      </TabsList>
                    </DialogHeader>
                    <TabsContent value="Segue">
                      <Card className="pt-6">
                        <CardContent>
                          {donor.following.slice(0, 5).map((follower) => (
                            <div key={follower.followingId}>
                              {follower.following.user.name}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="Seguidores"></TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </CardContent>
          ) : (
            <CardFooter>
              <div>Você não tem nenhum seguidor ainda</div>
            </CardFooter>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export function User() {
  return <div>User</div>;
}
