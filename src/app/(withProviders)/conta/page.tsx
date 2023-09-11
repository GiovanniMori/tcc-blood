import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
export default async function SettingsProfilePage() {
  const { userId } = auth()
  if (!userId) {
    return null
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={dbUser!} />
    </div>
  )
}
