"use client";
import { Button } from "@/components/ui/button";
import { SponsorShip, User } from "@prisma/client";
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
interface ProductProps {
  user: User;
  product: SponsorShip;
}
export default function Products({ product, user }: ProductProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  function handleRedeem() {
    if (product.points < user.points) {
      axios.post("/api/redeem", { id: product.id }).then((res) => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        setShowConfetti(true);
      });
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
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          <ScrollArea className="h-[150px] pr-2">
            {product.description}
          </ScrollArea>
        </CardDescription>
      </CardHeader>
      <CardContent>{showConfetti && <Confetti recycle={false} />}</CardContent>
      <CardFooter>
        {product.points}
        <Button onClick={handleRedeem}>Resgatar</Button>
      </CardFooter>
    </Card>
  );
}
