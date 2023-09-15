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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      axios.post("/api/redeem", { id: reward.id }).then((res) => {
        toast({
          title: "Cupom gerado com sucesso",
          description: "Você pode ver o cupom na sua pagina de perfil",
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
        <AlertDialog>
          <AlertDialogTrigger>Resgatar</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você deseja resgatar {reward.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza de que deseja resgatar este produto? Por favor,
                esteja ciente das seguintes informações importantes antes de
                prosseguir:{" "}
                <ul className="list-disc flex flex-col p-4">
                  <li>
                    O código de resgate será gerado após a confirmação. O código
                    será disponibilizado na sua página de perfil.
                  </li>
                  <li>
                    O código será disponibilizado na sua página de perfil.
                  </li>
                  <li>
                    Após o resgate, não será possível desfazê-lo ou recuperar os
                    pontos utilizados.
                  </li>
                  <li>
                    Certifique-se de que você atende a todos os requisitos e
                    termos de resgate deste produto.
                  </li>
                  <li>
                    Caso tenha alguma dúvida ou problema, entre em contato com
                    nosso suporte.
                  </li>
                </ul>{" "}
                Se você tem certeza de que deseja prosseguir e aceita as
                condições acima, clique em &ldquo;Resgatar&rdquo; abaixo. Caso
                contrário,&nbsp; clique em &ldquo;Cancelar&rdquo; para revisar
                sua escolha.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleRedeem}>
                Resgatar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
