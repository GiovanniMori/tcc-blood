import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  console.log(donor);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="flex flex-col gap-2">
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

      <div className="flex flex-col gap-2 ">
        <div className="md:hidden flex gap-2 justify-between">
          <div>Amigos</div>
          <Link href="/perfil/1">Adicionar amigos</Link>
        </div>
        <Tabs defaultValue="Segue">
          <TabsList className="w-full">
            <TabsTrigger value="Segue" className="w-full">
              Segue
            </TabsTrigger>
            <TabsTrigger value="Seguidores" className="w-full">
              Seguidores
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Segue">
            <Card className="pt-6">
              <CardContent>
                <p>
                  {donor.following.map((follower) => (
                    <div key={follower.followingId}>
                      {follower.following.user.name}
                    </div>
                  ))}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Seguidores">
            <Card className="pt-6">
              {donor.followers.length > 0 ? (
                <CardContent>
                  <p>
                    {donor.followers.map((follower) => (
                      <div key={follower.followingId}>
                        {follower.follower.user.name}
                      </div>
                    ))}
                  </p>
                </CardContent>
              ) : (
                <CardFooter>
                  <p>Você não tem nenhum seguidor ainda</p>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
