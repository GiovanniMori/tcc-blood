import * as z from "zod"
import { CompleteDonor, RelatedDonorSchema } from "./index"

export const MissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  progress: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMission extends z.infer<typeof MissionSchema> {
  donor: CompleteDonor[]
}

/**
 * RelatedMissionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMissionSchema: z.ZodSchema<CompleteMission> = z.lazy(() => MissionSchema.extend({
  donor: RelatedDonorSchema.array(),
}))
