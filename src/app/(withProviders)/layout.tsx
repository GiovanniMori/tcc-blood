import { redirect } from "next/navigation";
import { getUser } from "@/service/user";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/register");
  }

  return <>{children}</>;
}
