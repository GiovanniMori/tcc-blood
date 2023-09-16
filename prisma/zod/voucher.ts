import * as z from "zod"
import { CompleteUser, RelatedUserSchema, CompleteReward, RelatedRewardSchema } from "./index"

export const VoucherSchema = z.object({
  id: z.string(),
  code: z.string(),
  generatedAt: z.date(),
  reedemedBy: z.string().nullish(),
  rewardId: z.string(),
})

export interface CompleteVoucher extends z.infer<typeof VoucherSchema> {
  user?: CompleteUser | null
  Reward: CompleteReward
}

/**
 * RelatedVoucherSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVoucherSchema: z.ZodSchema<CompleteVoucher> = z.lazy(() => VoucherSchema.extend({
  user: RelatedUserSchema.nullish(),
  Reward: RelatedRewardSchema,
}))
