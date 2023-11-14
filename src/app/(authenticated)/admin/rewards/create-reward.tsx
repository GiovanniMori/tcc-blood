"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { rewardSchema } from "@/schemas/reward";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function CreateReward() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<rewardSchema>({
    resolver: zodResolver(rewardSchema),
    defaultValues: {},
  });
  const { toast } = useToast();
  async function onSubmit(data: rewardSchema) {
    axios
      .post("/api/rewards", data)
      .then(() => {
        setIsOpen(false);
        form.reset();
        toast({ title: "Recompensa criada com sucesso" });
      })
      .catch(() => toast({ title: "Erro ao criar recompensa" }));
  }
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button>Criar nova recompensa </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registre seu Produto</DialogTitle>
          <DialogDescription>
            Por favor, preencha as informações abaixo para registrar seu
            produto. Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da recompensa</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome que usuário irá resgatar/procurar por
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da recompensa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormDescription>Descrição da recompensa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pontos necessários</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Quantidade de pontos necessários para resgatar a recompensa
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem da recompensa</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>URL da imagem da recompensa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                className="w-full"
                variant={"secondary"}
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                Cancelar
              </Button>
              <Button className="w-full">Criar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
