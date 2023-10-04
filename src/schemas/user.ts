import * as z from "zod";
import { registerSchema, required_msg } from "./register";
import { validateCPF } from "@/utils/validate-cpf";

export const userDb = {
  email: z.string().email(),
  name: z.string(),
};

export const userSchema = registerSchema.extend(userDb);

export type userSchema = z.infer<typeof userSchema>;
