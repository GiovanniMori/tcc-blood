import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/prisma";
import { subMonths } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function RecentDonations() {
  const recentDonations = await prisma.bloodDonation.findMany({
    where: {
      createdAt: {
        gte: subMonths(new Date(), 1),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      donor: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const recentDonationsCount = await prisma.bloodDonation.count({
    where: {
      createdAt: {
        gte: subMonths(new Date(), 1),
      },
    },
  });

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Doações Recentes</CardTitle>
        <CardDescription>
          {recentDonationsCount === 0 ? (
            "Uh-oh! Parece que este mês estamos mais secos que o deserto! 😅 Nenhuma doação de sangue ainda, mas não se preocupe, sempre há espaço para heróis aqui! Junte-se a nós e ajude a encher nossos estoques, uma gota de cada vez. Sua doação faz a diferença! 💉✨"
          ) : (
            <>
              Total de {recentDonationsCount} doa
              {recentDonationsCount === 1 ? "ção" : "ções"} esse mês.
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-8">
          {recentDonations ? (
            recentDonations.map((donation) => (
              <li className="flex items-center" key={donation.id}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                    {donation.donor.nickname.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {donation.donor.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {donation.donor.nickname}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {donation.donor.bloodType}
                </div>
              </li>
            ))
          ) : (
            <>Sem doações recentes</>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
