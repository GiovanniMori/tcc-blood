"use client";
import React from "react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MaskCPF } from "@/utils/cpf-mask";

export default function Register() {
  const router = useRouter();
  const form = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  function handleFinishRegister(data: registerSchema) {
    axios
      .post("/api/user", data)
      .then((response) => {
        router.refresh();
        // do something with the response
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
  }
  // useEffect(() => {
  //   form.setValue("name", user?.firstName || "")
  // }, [form, user])
  console.log(form.formState.errors);

  return (
    <Card className="md:w-[75vw] lg:w-[45vw]">
      <CardHeader>
        <CardTitle>Finalização do cadastro</CardTitle>
        <CardDescription className="">
          Estamos quase lá! Ao adicionar essas informações, você estará pronto
          para ser um herói completo, prontamente apto a doar. Junte-se a nós
          para fazer a diferença!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFinishRegister)}
            className="flex flex-col gap-6 "
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="xxx.xxx.xxx-xx"
                        {...field}
                        value={MaskCPF(field.value)}
                      />
                    </FormControl>
                    {/* <FormDescription>Obrigatório</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Masculino</SelectItem>
                          <SelectItem value="FEMALE">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blood_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo Sanguíneo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o seu tipo sanguíneo" />
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
            </div>
            <Button className="w-full">Finalizar cadastro</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
