import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function NavbarLinks() {
  const user = await currentUser();
  const userDb = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  });

  return (
    <div className="flex gap-4">
      {userDb.role === "ADMIN" && (
        <>
          <Link
            href="/admin"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Patrocinadores
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Admin
          </Link>
        </>
      )}
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Doar
      </Link>
    </div>
  );
}
