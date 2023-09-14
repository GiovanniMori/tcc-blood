import prisma from "@/lib/prisma";
import { getUser } from "@/service/user";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function NavbarLinks() {
  const user = await getUser();

  return (
    <div className="flex gap-4">
      {user?.role === "ADMIN" && (
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
