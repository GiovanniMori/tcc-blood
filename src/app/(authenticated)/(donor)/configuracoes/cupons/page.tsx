import prisma from "@/lib/prisma";
import { getUser } from "@/service/user";

export default async function Home() {
  const user = await getUser();
  const vouchers = await prisma.voucher.findMany({
    where: { reedemedBy: user!.id },
    include: {
      reward: true,
    },
  });

  return (
    <main className="flex flex-col gap-8">
      {vouchers.map((voucher) => (
        <div
          key={voucher.id}
          className="flex flex-col gap-2 border-2 border-secondary rounded-md p-2 w-fit"
        >
          Produto: {voucher.reward.name}
          <div className="flex gap-2">
            Código: <div className="font-bold text-md">{voucher.code}</div>
          </div>
        </div>
      ))}
    </main>
  );
}
