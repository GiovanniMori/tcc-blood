import * as z from "zod"
import { CompleteHemocenter, RelatedHemocenterSchema, CompleteDonor, RelatedDonorSchema } from "./index"

export const AppointmentSchema = z.object({
  id: z.string(),
  hemocenterId: z.string(),
  date: z.date(),
  donorUserId: z.string().nullish(),
})

export interface CompleteAppointment extends z.infer<typeof AppointmentSchema> {
  hemocenter: CompleteHemocenter
  Donor?: CompleteDonor | null
}

/**
 * RelatedAppointmentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAppointmentSchema: z.ZodSchema<CompleteAppointment> = z.lazy(() => AppointmentSchema.extend({
  hemocenter: RelatedHemocenterSchema,
  Donor: RelatedDonorSchema.nullish(),
}))
