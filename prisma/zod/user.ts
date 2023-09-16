import * as z from "zod"
import { UserRole, Gender, BloodType } from "@prisma/client"
import { CompleteAppointment, RelatedAppointmentSchema, CompleteVoucher, RelatedVoucherSchema } from "./index"

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  name: z.string(),
  points: z.number().int(),
  role: z.nativeEnum(UserRole),
  gender: z.nativeEnum(Gender),
  lastDonationDate: z.date().nullish(),
  bloodType: z.nativeEnum(BloodType),
  cpf: z.string(),
})

export interface CompleteUser extends z.infer<typeof UserSchema> {
  appointments: CompleteAppointment[]
  Voucher: CompleteVoucher[]
}

/**
 * RelatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserSchema.extend({
  appointments: RelatedAppointmentSchema.array(),
  Voucher: RelatedVoucherSchema.array(),
}))
