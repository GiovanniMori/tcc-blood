import { validateCPF } from "@/utils/validate-cpf"
import { z } from "zod"

export const required_msg = "Campo obrigatório"
export const BloodTypeEnum = z.enum(
  ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  { required_error: required_msg }
)

const GenderEnum = z.enum(["MALE", "FEMALE", "PREFER_NOT_TO_SAY"], {
  required_error: required_msg,
})

export const registerSchema = z.object({
  name: z.string({ required_error: required_msg }),
  cpf: z
    .string({ required_error: required_msg })
    .refine((val) => validateCPF(val)),
  blood_type: BloodTypeEnum,
  gender: GenderEnum,
})

export type registerSchema = z.infer<typeof registerSchema>
