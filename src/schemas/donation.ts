import * as z from "zod";
import { BloodTypeEnum } from "./register";

export const bloodDonationSchema = z.object({
  donorId: z.string(),
  hemocenterId: z.string(),
  bloodType: BloodTypeEnum,
  donationDate: z.coerce.date(),
  volume: z.coerce.number(),
  expiration: z.coerce.date().optional(),
  verified: z.boolean().default(false),
  appointmentId: z.string().optional(),
});

export type bloodDonationSchema = z.infer<typeof bloodDonationSchema>;
