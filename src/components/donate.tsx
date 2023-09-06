"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import { Checkbox } from "@/components/ui/checkbox"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export function Donate() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Triagem prévia</CardTitle>
            <CardDescription>
              A honestidade nessa etapa da doação de sangue é fundamental para
              preservar a saúde do doador e do paciente. Identifique as
              situações que estão sendo questionadas e responda com precisão
              cada questão. A pré-triagem eletrônica tem como objetivo evitar um
              deslocamento do candidato ao posto de coleta caso esteja impedido
              de doar sangue por um dos requisitos básicos. Caso aprovado, a
              agenda online ficará aberta para escolha do melhor local, dia e
              horário; caso tenha algum impedimento, o sistema apresentará o
              tempo de inaptidão e abrirá a agenda após a data liberada para
              realizar a doação de sangue, dentro do prazo definido de abertura
              da agenda. Contamos com seu apoio e boa doação!
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <p>
              Obs: Estas questões não esgotam os motivos de impedimentos para
              doação, de forma que outras informações prestadas por você durante
              a Triagem Clínica (no posto de coleta) também serão consideradas
              para definir se está apto para doar sangue nesse momento.
            </p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Seus dados</CardTitle>
            <CardDescription>Nome Aleatorio</CardDescription>
          </CardHeader>
          <CardContent>
            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>

            <p>CPF: 120.123.123-43</p>

            <p>CPF: 120.123.123-43</p>
            <p>CPF: 120.123.123-43</p>
          </CardContent>
          <CardFooter className="flex justify-end  ">
            <Button variant="secondary" asChild>
              <Link href={"/sign-in"}>Atualizar Dados</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Preencha</CardTitle>
          <CardDescription>Precisamos disso para validar</CardDescription>
        </CardHeader>
        <CardContent>
          Doou sangue (sexo biológico masculino) há menos de 2 meses?
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Não </Label>
            </div>
          </RadioGroup>
          <Separator />
        </CardContent>
      </Card>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Declaro ter lido e compreendido todas as perguntas apresentadas
          anteriormente e ter respondido com honestidade a todos os
          questionamentos, ao clicar em Prosseguir, as respostas não poderão ser
          alteradas! Deseja confirmá-las?
        </label>
      </div>
      <Button>Confirmar</Button>
    </div>
  )
}
