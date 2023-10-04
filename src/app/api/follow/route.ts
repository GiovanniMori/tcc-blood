import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const data = await req.json();
  console.log("FOLLOW ID: ", data.followerId);
  try {
    const follower = await prisma.user.findUnique({
      where: { id: data.followerId },
    });

    if (!follower) {
      return NextResponse.json({ message: "Follower not found" });
    }

    const follow = await prisma.follows.create({
      data: {
        following: { connect: { id: userId } },
        follower: { connect: { id: data.followerId } },
      },
    });

    return NextResponse.json(follow);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
