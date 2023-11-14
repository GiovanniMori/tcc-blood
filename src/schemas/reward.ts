import { z } from "zod";

export const required_msg = "Campo obrigatório";

export const rewardSchema = z.object({
  name: z.string({ required_error: required_msg }),
  description: z.string({ required_error: required_msg }),
  points: z.coerce.number({ required_error: required_msg }),
  imageUrl: z.string({ required_error: required_msg }),
  vouchers: z
    .array(
      z.object({
        code: z.string({ required_error: required_msg }),
        sponsorId: z.string({ required_error: required_msg }),
      })
    )
    .optional(),
});

export type rewardSchema = z.infer<typeof rewardSchema>;
