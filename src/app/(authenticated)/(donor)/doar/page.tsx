import { Booking } from "@/components/booking";
import { useToast } from "@/components/ui/use-toast";
import prisma from "@/lib/prisma";
import { getDonor } from "@/service/donor";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const donor = await getDonor();
  const appointments = await prisma.appointment.findMany({
    where: {
      donorUserId: donor?.id,
    },
    include: {
      hemocenter: true,
    },
  });
  let cannotDonate = false; // declare a variable to track if the donor cannot donate

  if (donor?.lastDonationDate) {
    const currentDate = new Date();
    const lastDonationDate = new Date(donor.lastDonationDate);
    const timeDiff = currentDate.getTime() - lastDonationDate.getTime();
    const monthsDiff = timeDiff / (1000 * 3600 * 24 * 30); // assuming 30 days in a month

    if (donor.gender === "MALE" && monthsDiff < 3) {
      // toast({
      //   title: "Alerta: Doação Já Realizada",
      //   description:
      //     "Desculpe, você já fez uma doação nos últimos 3 meses. Obrigado pelo seu apoio!",
      // }); // male donor can donate if last donation was less than 3 months ago
      cannotDonate = true; // set the variable to true if the donor cannot donate
    } else if (donor.gender === "FEMALE" && monthsDiff < 4) {
      // toast({
      //   title: "Alerta: Doação Já Realizada",
      //   description:
      //     "Desculpe, você já fez uma doação nos últimos 4 meses. Obrigado pelo seu apoio!",
      // });
      cannotDonate = true; // set the variable to true if the donor cannot donate
    }
  }
  let isAbleToDonate =
    appointments.length >= 1 ? appointments[0].status !== "PENDING" : true; // declare a variable to track if the donor is able to donate

  return (
    <main className="flex flex-col gap-8">
      {cannotDonate ? (
        <Card>
          <CardHeader>
            <CardTitle>Você não pode doar</CardTitle>
          </CardHeader>
          <CardContent>
            Sua ultima doação foi em{" "}
            {new Date(donor?.lastDonationDate!).toLocaleDateString()}
          </CardContent>
        </Card>
      ) : (
        isAbleToDonate && <Booking donor={donor!} />
      )}
      {appointments.length >= 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Seus agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.map((appointment) => (
              <div key={appointment.id}>
                Dia {new Date(appointment.date).toLocaleDateString()}
                <div>
                  Nome: {appointment.hemocenter.name}
                  <div>Local: {appointment.hemocenter.address}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
