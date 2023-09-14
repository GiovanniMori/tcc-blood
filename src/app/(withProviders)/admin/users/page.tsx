import { User } from "@prisma/client";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { useParams, usePathname, useSearchParams } from "next/navigation";
export const metadata: Metadata = {
  title: "Clientes",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function DemoPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="text-lg font-bold">Bem vindo de volta!</div>
        <div className="text-sm font-light">Aqui estão todos os clientes</div>
      </div>
      <DataTable />
    </div>
  );
}
