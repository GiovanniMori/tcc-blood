import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import Follows from "@/components/follows";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Droplet,
  HeartPulse,
  HelpingHand,
  LucideIcon,
  Share2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddFriend from "@/components/navigation-item";
import NavigationItem from "@/components/navigation-item";
import Achievements from "@/components/achievements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

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
  const missions = await prisma.mission.findMany({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="flex flex-col gap-4 md:col-span-3">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-3xl font-semibold">{donor.user.name}</div>
              <div className="text-lg font-light text-foreground">
                @{donor.nickname}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Calendar />
              Por aqui desde {donor.user.createdAt.toLocaleDateString(`pt-BR`)}
            </div>
            <div className="flex gap-2 items-center">
              <Droplet />
              {donor.bloodType}
            </div>
          </div>
          <Link href={"/configuracoes"}>
            <Avatar className="md:w-24 md:h-24">
              <AvatarImage src="https://github.com/shadcn.pngs" />
              <AvatarFallback className="md:text-4xl">
                {donor.user.name[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="text-2xl">Estatísticas</div>
          <div className="grid md:grid-cols-2  gap-4">
            <Statistics description="4" icon={HeartPulse} title="Doações" />
            <Statistics
              description="+40"
              icon={HelpingHand}
              title="Possíveis vidas salvas"
            />
            <Statistics
              description="0"
              icon={Users}
              title="Usuários indicados"
            />
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="text-2xl">Conquistas</div>
          <Achievements missions={missions} />
        </div>
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="md:hidden flex gap-2 justify-between items-center">
          <div>Amigos</div>
          <Button asChild>
            <Link href="/amigos">Adicionar amigos</Link>
          </Button>
        </div>
        <Follows donor={donor} />
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Adicionar amigos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href={"/amigos"}>
              <NavigationItem icon={Users} content="Encontrar novos amigos" />
            </Link>
            <NavigationItem icon={Share2} content="Convidar amigos" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatisticsProps {
  icon: LucideIcon;
  title: string;
  description: string;
}
function Statistics({ icon: Icon, title, description }: StatisticsProps) {
  return (
    <div className="flex gap-4 px-4 py-2 border rounded-md items-center">
      <Icon size={24} className="text-primary" />
      <div className="flex flex-col">
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
}
