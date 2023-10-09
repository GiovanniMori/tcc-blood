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
import { toast, useToast } from "@/components/ui/use-toast";
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
import React, { useMemo, useState } from "react";
import { donateSchema } from "@/schemas/donate";
import { Appointment, Donor, Gender, Hemocenter, User } from "@prisma/client";
import { Input } from "./ui/input";
import { donorWithUser } from "@/types/donorWithUser";
import { PaginationState } from "@tanstack/react-table";
import { useDebounce } from "use-debounce";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { useQuery } from "@tanstack/react-query";
import { SelectSingleEventHandler } from "react-day-picker";
import { paginatedProps } from "@/types/paginationProps";
import { MaskCPF } from "@/utils/cpf-mask";

async function getHemocenter({
  pageNumber = 0,
  pageSize = 10,
}: paginatedProps) {
  const res = await fetch(
    `/api/hemocenters?page_size=${pageSize}&page_number=${pageNumber}`
  );
  const response: PaginatedResponse<Hemocenter> = await res.json();
  return response;
}
async function getAvailableDates({
  pageNumber = 0,
  pageSize = 10,
  hemocenter_id,
}: paginatedProps & { hemocenter_id: string }) {
  const res = await fetch(
    `/api/hemocenters/dates?hemocenter_id=${hemocenter_id}`
  );
  const response: PaginatedResponse<Date> = await res.json();
  return response;
}

const PAGE_SIZE = 10;

export function Booking({ donor }: { donor: donorWithUser }) {
  const { toast } = useToast();
  const { formState, getValues, watch, setValue } = useForm<donateSchema>({
    resolver: zodResolver(donateSchema),
  });

  const date = watch(`date`);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["hemocenters", pagination],
    queryFn: () =>
      getHemocenter({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
  });

  const { data: HemocenterAvailableDates } = useQuery({
    queryKey: ["HemocenterAvailableDates", pagination],
    queryFn: () =>
      getAvailableDates({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        hemocenter_id: `1`,
      }),
  });
  function handleNextPage() {
    setPagination({ ...pagination, pageIndex: pageIndex + 1 });
  }

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

  function handleHemocenterChange(value: string) {}
  function handleDaySelected(value: SelectSingleEventHandler) {}

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Seus dados</CardTitle>
            <CardDescription>{donor.user.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>CPF: {MaskCPF(donor.cpf)}</p>
            <p>Email: {donor.user.email}</p>
            {donor.gender && (
              <p>
                Sexo: {donor.gender === Gender.MALE ? "Masculino" : "Feminino"}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end  ">
            <Button variant="secondary" asChild>
              <Link href={"/sign-in"}>Atualizar Dados</Link>
            </Button>
          </CardFooter>
        </Card>
        {data && (
          <Card className="lg:col-span-7 ">
            <CardHeader>
              <CardTitle>Postos</CardTitle>
              <CardDescription>Escolha o posto mais próximo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
              <Select onValueChange={(value) => handleHemocenterChange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ver postos disponíveis" />
                </SelectTrigger>
                <SelectContent>
                  {data.data.map((hemocenter) => (
                    <SelectItem value={hemocenter.id} key={hemocenter.id}>
                      {hemocenter.name}
                    </SelectItem>
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
                    {date ? format(date, "PPP") : <span>Escolha uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    fromDate={new Date()}
                    locale={ptBR}
                    onSelect={(e) => setValue("date", e!)}
                    // disabled={disabledDates}
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
            <CardFooter className="flex justify-end  ">
              <Button variant="default" onClick={handleBooking}>
                Confirmar agendamento
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
