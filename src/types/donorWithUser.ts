import { Prisma } from "@prisma/client";

export type donorWithUser = Prisma.DonorGetPayload<{
  include: {
    user: true;
  };
}>;
