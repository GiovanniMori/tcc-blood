import * as z from "zod"
import { CompleteVoucher, RelatedVoucherSchema } from "./index"

export const RewardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  points: z.number().int(),
})

export interface CompleteReward extends z.infer<typeof RewardSchema> {
  Voucher: CompleteVoucher[]
}

/**
 * RelatedRewardSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRewardSchema: z.ZodSchema<CompleteReward> = z.lazy(() => RewardSchema.extend({
  Voucher: RelatedVoucherSchema.array(),
}))
