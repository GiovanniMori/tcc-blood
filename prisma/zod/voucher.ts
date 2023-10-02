import * as z from "zod"
import { CompleteDonor, RelatedDonorSchema, CompleteReward, RelatedRewardSchema, CompleteSponsor, RelatedSponsorSchema } from "./index"

export const VoucherSchema = z.object({
  id: z.string(),
  code: z.string(),
  generatedAt: z.date(),
  reedemedBy: z.string().nullish(),
  rewardId: z.string(),
  sponsorId: z.string(),
})

export interface CompleteVoucher extends z.infer<typeof VoucherSchema> {
  donor?: CompleteDonor | null
  Reward: CompleteReward
  Sponsor: CompleteSponsor
}

/**
 * RelatedVoucherSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVoucherSchema: z.ZodSchema<CompleteVoucher> = z.lazy(() => VoucherSchema.extend({
  donor: RelatedDonorSchema.nullish(),
  Reward: RelatedRewardSchema,
  Sponsor: RelatedSponsorSchema,
}))
