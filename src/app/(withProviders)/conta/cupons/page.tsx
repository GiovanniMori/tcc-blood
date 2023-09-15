import prisma from "@/lib/prisma";
import { getUser } from "@/service/user";

export default async function Home() {
  const user = await getUser();
  const vouchers = await prisma.voucher.findMany({
    where: { reedemedBy: user!.id },
  });

  return (
    <main className="flex flex-col gap-8">
      {vouchers.map((voucher) => (
        <div key={voucher.id}>{voucher.code}</div>
      ))}
    </main>
  );
}
