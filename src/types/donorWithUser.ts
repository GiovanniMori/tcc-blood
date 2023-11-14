import { Prisma } from "@prisma/client";

export type donorWithUser = Prisma.DonorGetPayload<{
  include: {
    user: true;
  };
}>;

export type appointmentDonorWithUser = Prisma.AppointmentGetPayload<{
  include: {
    donor: {
      include: {
        user: true;
      };
    };
  };
}>;
