import * as z from "zod"
import { CompleteDonor, RelatedDonorSchema } from "./index"

export const FollowsSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
})

export interface CompleteFollows extends z.infer<typeof FollowsSchema> {
  follower: CompleteDonor
  following: CompleteDonor
}

/**
 * RelatedFollowsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFollowsSchema: z.ZodSchema<CompleteFollows> = z.lazy(() => FollowsSchema.extend({
  follower: RelatedDonorSchema,
  following: RelatedDonorSchema,
}))
