import { redirect } from "next/navigation";
import { getUser } from "@/service/user";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user?.role !== "SPONSOR" && user?.role !== "ADMIN") {
    redirect("/");
  }
  return <>{children}</>;
}
