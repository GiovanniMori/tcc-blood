import * as z from "zod"
import { Gender, BloodType } from "@prisma/client"
import { CompleteUser, RelatedUserSchema, CompleteAppointment, RelatedAppointmentSchema, CompleteVoucher, RelatedVoucherSchema, CompleteFollows, RelatedFollowsSchema, CompleteMission, RelatedMissionSchema } from "./index"

export const DonorSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  lastDonationDate: z.date().nullish(),
  cpf: z.string(),
  points: z.number().int(),
  gender: z.nativeEnum(Gender),
  bloodType: z.nativeEnum(BloodType),
})

export interface CompleteDonor extends z.infer<typeof DonorSchema> {
  user: CompleteUser
  appointments: CompleteAppointment[]
  Voucher: CompleteVoucher[]
  followers: CompleteFollows[]
  following: CompleteFollows[]
  Mission: CompleteMission[]
}

/**
 * RelatedDonorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDonorSchema: z.ZodSchema<CompleteDonor> = z.lazy(() => DonorSchema.extend({
  user: RelatedUserSchema,
  appointments: RelatedAppointmentSchema.array(),
  Voucher: RelatedVoucherSchema.array(),
  followers: RelatedFollowsSchema.array(),
  following: RelatedFollowsSchema.array(),
  Mission: RelatedMissionSchema.array(),
}))
