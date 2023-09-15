"use client";
import { Button } from "@/components/ui/button";
import { Reward, User } from "@prisma/client";
import React from "react";
import { useState } from "react";
import Confetti from "react-confetti";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
interface RewardProps {
  user: User;
  reward: Reward;
}
export default function Rewards({ reward, user }: RewardProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  function handleRedeem() {
    if (reward.points < user.points) {
      axios.post("/api/redeem", { id: reward.id }).then((res) => {});
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      setShowConfetti(true);
    } else {
      toast({
        title: "Falha ao resgatar",
        description: "Voce nao tem pontos suficientes",
      });
    }
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4 ">
          <div className=" w-full   relative">
            <Image src="next.svg" fill alt={reward.name} />
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle>{reward.name}</CardTitle>
            <CardDescription>
              <ScrollArea className="h-[150px] pr-2">
                {reward.description}
              </ScrollArea>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{showConfetti && <Confetti recycle={false} />}</CardContent>
      <CardFooter className="w-full flex justify-between">
        <div className="text-primary font-semibold text-lg">
          {reward.points} pontos
        </div>
        <Button onClick={handleRedeem}>Resgatar</Button>
      </CardFooter>
    </Card>
  );
}
