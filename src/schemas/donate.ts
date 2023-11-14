import { validateCPF } from "@/utils/validate-cpf";
import { z } from "zod";

const required_msg = "Campo obrigatório";

export const donateSchema = z.object({
  hemocenter: z.string({}),
  date: z.date({
    required_error: required_msg,
  }),
});

export type donateSchema = z.infer<typeof donateSchema>;
