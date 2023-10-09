import prisma from "@/lib/prisma";
import { BellRing } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const hemocenters = await prisma.hemocenter.findMany();
  return (
    <main className="flex flex-col gap-8">
      Hemocentros Disponíveis
      {hemocenters.map((hemocenter) => (
        <Link href={`/hemocentros/${hemocenter.id}`} key={hemocenter.id}>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {hemocenter.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {hemocenter.address}
              </p>
            </div>
            <>Abre as {hemocenter.startHour.toLocaleTimeString("pt-Br")}</>
            <>Fecha as {hemocenter.endHour.toLocaleTimeString("pt-Br")}</>
          </div>
        </Link>
      ))}
    </main>
  );
}
