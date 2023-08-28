"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { userSchema } from "@/schemas/user"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()
  const form = useForm<userSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.firstName || "",
      // gender: `PREFER_NOT_TO_SAY`,
    },
  })
  function handleFinishRegister(data: userSchema) {
    console.log("entrei")
    console.log(data)
  }
  // useEffect(() => {
  //   form.setValue("name", user?.firstName || "")
  // }, [form, user])
  console.log(form.formState.errors)

  return (
    <Card className="w-[500px]">
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
            <div className="grid grid-cols-2  gap-4">
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
                      <Input placeholder="xxx.xxx.xxx-xx" {...field} />
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
                          <SelectItem value="PREFER_NOT_TO_SAY">
                            Prefiro não dizer
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
                          <SelectValue placeholder="Selecione seu tipo sanguíneo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+ (positivo)</SelectItem>
                          <SelectItem value="A-">A- (negativo)</SelectItem>
                          <SelectItem value="B+">B+ (positivo)</SelectItem>
                          <SelectItem value="B-">B- (negativo)</SelectItem>
                          <SelectItem value="AB+">AB+ (positivo)</SelectItem>
                          <SelectItem value="AB-">AB- (negativo)</SelectItem>
                          <SelectItem value="O+">O+ (positivo)</SelectItem>
                          <SelectItem value="O-">O- (negativo)</SelectItem>
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
  )
}
