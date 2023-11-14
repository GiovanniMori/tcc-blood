import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "./components/overview";
import { RecentDonations } from "./components/recent-donations";
import prisma from "@/lib/prisma";
import { CheckCircle, Database, Droplet, User } from "lucide-react";
import { addMonths } from "date-fns";
import { AppointmentStatus } from "@prisma/client";
import TeamSwitcher from "./components/team-switcher";
import { MainNav } from "./components/main-nav";
import { Search } from "./components/search";
import { UserNav } from "./components/user-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default async function DashboardPage() {
  const oneMonthAgo = addMonths(new Date(), -1);

  const usersCreatedLastMonth = await prisma.user.count();
  const usersCreated = await prisma.user.count({
    where: {
      createdAt: {
        gte: oneMonthAgo,
      },
    },
  });

  const donationsGroupedByBloodType = await prisma.bloodDonation.groupBy({
    by: "bloodType",
    _sum: {
      volume: true,
    },
  });
  const donations = await prisma.bloodDonation.findMany();
  const donationsLastMonth = await prisma.bloodDonation.findMany({
    where: {
      createdAt: {
        gte: oneMonthAgo,
      },
    },
  });
  const currentDateTime = new Date();
  const stock = await prisma.bloodDonation.findMany({
    where: {
      expiration: {
        gte: currentDateTime,
      },
    },
  });
  const totalBloodDonationsVolume = stock.reduce(
    (total, donation) => total + donation.volume,
    0
  );
  const appointmentsSuccess = await prisma.appointment.count({
    where: {
      status: {
        equals: AppointmentStatus.ACCEPTED,
      },
    },
  });
  const appointmentsSuccessLastMonth = await prisma.appointment.count({
    where: {
      status: {
        equals: AppointmentStatus.ACCEPTED,
      },
      createdAt: {
        gte: oneMonthAgo,
      },
    },
  });

  const totalVolume = donations.reduce(
    (acc, donation) => acc + donation.volume,
    0
  );
  const totalVolumeLastMonth = donationsLastMonth.reduce(
    (acc, donation) => acc + donation.volume,
    0
  );

  const data = donationsGroupedByBloodType.map((donation) => ({
    blood_type: donation.bloodType,
    total: donation._sum.volume,
  }));

  const percentage = {
    users: (
      ((usersCreated - usersCreatedLastMonth) / usersCreatedLastMonth) *
      100
    ).toFixed(2),
    volume: (
      ((totalVolume - totalVolumeLastMonth) / totalVolumeLastMonth) *
      100
    ).toFixed(2),
    appointments: (
      ((appointmentsSuccess - appointmentsSuccessLastMonth) /
        appointmentsSuccessLastMonth) *
      100
    ).toFixed(2),
  };
  return (
    <div className="flex-col flex">
      {/* <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div> */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Novos usuários
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usersCreated}</div>
              <p className="text-xs text-muted-foreground">
                {percentage.users}% comparado com mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Doações com sucesso
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointmentsSuccess}</div>
              <p className="text-xs text-muted-foreground">
                {percentage.appointments}% comparado com mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Volume de Sangue Doado
              </CardTitle>
              <Droplet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVolume}ml</div>
              <p className="text-xs text-muted-foreground">
                {percentage.volume}% comparado com mês passado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Estoque atual
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalBloodDonationsVolume}ml
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Visão geral</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={data} />
            </CardContent>
          </Card>
          <RecentDonations />
        </div>
      </div>
    </div>
  );
}
