import FirstSection from "@/components/homepage/first-section";
import Goal from "@/components/homepage/goal";
import prisma from "@/lib/prisma";
import Products from "./products";
import { getUser } from "@/service/user";

export default async function Page() {
  const products = await prisma.sponsorShip.findMany();
  const user = await getUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Products product={product} key={product.id} user={user!} />
      ))}
      {products.map((product) => (
        <Products product={product} key={product.id} user={user!} />
      ))}
      {products.map((product) => (
        <Products product={product} key={product.id} user={user!} />
      ))}
      {products.map((product) => (
        <Products product={product} key={product.id} user={user!} />
      ))}
    </div>
  );
}
