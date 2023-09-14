import { redirect } from "next/navigation";
import { useDbUser } from "@/hooks/server/useDbUser";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
