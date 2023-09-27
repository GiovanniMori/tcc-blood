import * as z from "zod"
import { UserRole } from "@prisma/client"
import { CompleteSponsor, RelatedSponsorSchema, CompleteDonor, RelatedDonorSchema } from "./index"

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  name: z.string(),
  role: z.nativeEnum(UserRole),
})

export interface CompleteUser extends z.infer<typeof UserSchema> {
  Sponsor: CompleteSponsor[]
  Donor: CompleteDonor[]
}

/**
 * RelatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserSchema.extend({
  Sponsor: RelatedSponsorSchema.array(),
  Donor: RelatedDonorSchema.array(),
}))
