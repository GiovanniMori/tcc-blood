import prisma from "@/lib/prisma";
import { getUser } from "@/service/user";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import UserNavbar from "./user-navbar";

export default async function NavbarLinks() {
  const user = await getUser();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {user && user.role === "ADMIN" && (
        <>
          <Link
            href="/patrocine"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Patrocine
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
        href="/doar"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Doar
      </Link>
      <Link
        href="/recompensas"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Recompensas
      </Link>
      <Link
        href="/missoes"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Missōes
      </Link>
    </div>
  );
}
