import * as z from "zod"
import { CompleteUser, RelatedUserSchema, CompleteVoucher, RelatedVoucherSchema } from "./index"

export const SponsorSchema = z.object({
  name: z.string(),
  email: z.string(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSponsor extends z.infer<typeof SponsorSchema> {
  user: CompleteUser
  Voucher: CompleteVoucher[]
}

/**
 * RelatedSponsorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSponsorSchema: z.ZodSchema<CompleteSponsor> = z.lazy(() => SponsorSchema.extend({
  user: RelatedUserSchema,
  Voucher: RelatedVoucherSchema.array(),
}))
