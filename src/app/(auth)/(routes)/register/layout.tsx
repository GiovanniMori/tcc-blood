import { getUser } from "@/service/user";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user) {
    !user && redirect("/register");
  }
  return <>{children}</>;
}
