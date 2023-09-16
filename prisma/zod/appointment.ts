import * as z from "zod"
import { CompleteUser, RelatedUserSchema, CompleteHemocenter, RelatedHemocenterSchema } from "./index"

export const AppointmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  hemocenterId: z.string(),
  date: z.date(),
})

export interface CompleteAppointment extends z.infer<typeof AppointmentSchema> {
  user: CompleteUser
  hemocenter: CompleteHemocenter
}

/**
 * RelatedAppointmentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAppointmentSchema: z.ZodSchema<CompleteAppointment> = z.lazy(() => AppointmentSchema.extend({
  user: RelatedUserSchema,
  hemocenter: RelatedHemocenterSchema,
}))
