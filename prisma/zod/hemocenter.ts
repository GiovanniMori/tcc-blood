import * as z from "zod"
import { CompleteAppointment, RelatedAppointmentSchema } from "./index"

export const HemocenterSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
})

export interface CompleteHemocenter extends z.infer<typeof HemocenterSchema> {
  appointment: CompleteAppointment[]
}

/**
 * RelatedHemocenterSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHemocenterSchema: z.ZodSchema<CompleteHemocenter> = z.lazy(() => HemocenterSchema.extend({
  appointment: RelatedAppointmentSchema.array(),
}))
