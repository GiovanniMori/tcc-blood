import { redirect } from "next/navigation";
import { getUser } from "@/service/user";
import { getSponsor } from "@/service/sponsor";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sponsor = await getSponsor();

  if (!sponsor) {
    redirect("/");
  }
  return <>{children}</>;
}
