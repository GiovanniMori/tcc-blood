"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { donateSchema } from "@/schemas/donate";
import { Appointment, Hemocenter, User } from "@prisma/client";
import { Input } from "./ui/input";

interface BookingProps {
  user: User;
  hemocenters: Hemocenter[];
  disabledDates: Date[];
}
export function Booking({ user, hemocenters, disabledDates }: BookingProps) {
  const [date, setDate] = React.useState<Date>();
  const form = useForm<donateSchema>({
    resolver: zodResolver(donateSchema),
    defaultValues: {},
  });
  const minDate = new Date();
  console.log(disabledDates);
  function handleBooking() {
    toast({
      title: "Seu agendamento foi confirmado!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">oi</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Seus dados</CardTitle>
            <CardDescription>{user.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>CPF: {user.cpf}</p>
            <p>Email: {user.email}</p>
            <p>Sexo: {user.gender}</p>
          </CardContent>
          <CardFooter className="flex justify-end  ">
            <Button variant="secondary" asChild>
              <Link href={"/sign-in"}>Atualizar Dados</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Postos</CardTitle>
            <CardDescription>Escolha o posto mais próximo</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ver postos disponíveis" />
              </SelectTrigger>
              <SelectContent>
                {hemocenters.map((hemocenter) => (
                  <>
                    <SelectItem value={hemocenter.id}>
                      {hemocenter.name}
                    </SelectItem>
                  </>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    " justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  fromDate={new Date()}
                  locale={ptBR}
                  onSelect={setDate}
                  disabled={disabledDates}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input type="time" step="1800" />
          </CardContent>
          <CardFooter className="flex justify-end  ">
            <Button variant="default" onClick={handleBooking}>
              Confirmar agendamento
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
