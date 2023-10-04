import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import Follows from "@/components/follows";

export default async function Home({ params }: { params: { id: string } }) {
  const donor = await prisma.donor.findUnique({
    where: {
      nickname: params.id,
    },
    include: {
      user: true,
      followers: {
        include: {
          follower: {
            include: {
              user: true,
            },
          },
        },
      },
      following: {
        include: {
          following: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });
  if (!donor) {
    redirect("/404");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="flex flex-col gap-2 col-span-3">
        <div>
          <div className="text-lg font-semibold">{donor.user.name}</div>
          <div>@{donor.nickname}</div>
          <div>
            Por aqui desde {donor.user.createdAt.toLocaleDateString(`pt-BR`)}
          </div>
          <div>amigos</div>
        </div>
        <Separator />
        <div>
          <div>Estatisticas</div>
        </div>
        <Separator />
        <div>
          <div>Conquistas</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 col-span-2 ">
        <div className="md:hidden flex gap-2 justify-between">
          <div>Amigos</div>
          <Link href="/perfil/1">Adicionar amigos</Link>
        </div>
        <Follows donor={donor} />
      </div>
    </div>
  );
}
