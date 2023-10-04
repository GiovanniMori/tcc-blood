import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { followerId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const follower = await prisma.user.findUnique({
      where: { id: followerId },
    });

    if (!follower) {
      return res.status(404).json({ message: "Follower not found" });
    }

    const follow = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: userId,
        },
      },
    });

    return res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
