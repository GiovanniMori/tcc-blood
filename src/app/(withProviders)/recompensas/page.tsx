import FirstSection from "@/components/homepage/first-section";
import Goal from "@/components/homepage/goal";
import prisma from "@/lib/prisma";
import Products from "./products";
import { getUser } from "@/service/user";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const rewards = await prisma.reward.findMany();
  const user = await getUser();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl">Seus pontos {user?.points}</div>
        <Button>Filtro</Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <Products reward={reward} key={reward.id} user={user!} />
        ))}
      </div>
    </div>
  );
}
