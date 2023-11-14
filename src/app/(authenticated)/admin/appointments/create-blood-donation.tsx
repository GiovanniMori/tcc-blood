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
import { bloodDonationSchema } from "@/schemas/donation";
import { CalendarIcon, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateBloodDonationProps {
  hemocenterId: string;
  donorId: string;
  donationDate: Date;
  appointmentId: string;
}

export default function CreateBloodDonation({
  hemocenterId,
  donorId,
  donationDate,
  appointmentId,
}: CreateBloodDonationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<bloodDonationSchema>({
    resolver: zodResolver(bloodDonationSchema),
    defaultValues: {
      hemocenterId,
      donorId,
      donationDate,
      appointmentId,
    },
  });
  console.log(form.formState.errors);
  const { toast } = useToast();
  async function onSubmit(data: bloodDonationSchema) {
    axios
      .post("/api/donation", data)
      .then(() => {
        setIsOpen(false);
        form.reset();
        toast({ title: "Doação criada com sucesso" });
      })
      .catch(() => toast({ title: "Erro ao criar doação" }));
  }
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button>
          <Check />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete a doação</DialogTitle>
          <DialogDescription>
            Por favor, preencha as informações abaixo para registrar a doação.
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de Sangue doado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      type="number"
                      inputMode="numeric"
                    />
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
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Sanguíneo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo sanguíneo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A_POSITIVE">
                          A+ (positivo)
                        </SelectItem>
                        <SelectItem value="A_NEGATIVE">
                          A- (negativo)
                        </SelectItem>
                        <SelectItem value="B_POSITIVE">
                          B+ (positivo)
                        </SelectItem>
                        <SelectItem value="B_NEGATIVE">
                          B- (negativo)
                        </SelectItem>
                        <SelectItem value="AB_POSITIVE">
                          AB+ (positivo)
                        </SelectItem>
                        <SelectItem value="AB_NEGATIVE">
                          AB- (negativo)
                        </SelectItem>
                        <SelectItem value="O_POSITIVE">
                          O+ (positivo)
                        </SelectItem>
                        <SelectItem value="O_NEGATIVE">
                          O- (negativo)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validade do Sangue</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(value: any) => field.onChange(value)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Nome que usuário irá resgatar/procurar por
                  </FormDescription>
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
