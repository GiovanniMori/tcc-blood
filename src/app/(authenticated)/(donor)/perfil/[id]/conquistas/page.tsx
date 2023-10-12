import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { redirect, useParams } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user) {
    redirect("/404");
  }
  return (
    <main className="flex justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-primary">
        Todas as conquistas
      </h1>
    </main>
  );
}
