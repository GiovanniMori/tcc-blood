import { ProfileForm } from "./components/profile-form";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
export default async function SettingsProfilePage() {
  const { userId } = auth();
  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
    include: {
      Donor: true,
      Sponsor: true,
    },
  });
  return <ProfileForm user={user!} />;
}
