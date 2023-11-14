import prisma from "@/lib/prisma";
import { BellRing, Building } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const hemocenters = await prisma.hemocenter.findMany({});
  return (
    <main className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-semibold ">Hemocentros Disponíveis</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hemocenters.map((hemocenter) => (
          <div
            // href={`/hemocentros/${hemocenter.id}`}
            key={hemocenter.id}
          >
            <div className="flex items-center p-4 rounded-lg border border-gray-200 h-full transition duration-300 ease-in-out transform hover:scale-105">
              <Building className="w-12 h-12" />{" "}
              <div className="flex-1 ml-4">
                <p className="text-lg font-medium ">{hemocenter.name}</p>
                <p className="text-sm font-light">{hemocenter.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
