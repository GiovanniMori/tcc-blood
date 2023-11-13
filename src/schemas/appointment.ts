import * as z from "zod";

export const appointmentSchema = z.object({
  donorId: z.string(),
  hemocenterId: z.string(),
  date: z.coerce.date(),
});

export type appointmentSchema = z.infer<typeof appointmentSchema>;
