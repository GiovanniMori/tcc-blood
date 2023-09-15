import { z } from "zod";

export const redeemSchema = z.object({
  id: z.string(),
});

export type redeemSchema = z.infer<typeof redeemSchema>;
