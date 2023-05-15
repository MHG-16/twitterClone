import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  userId?: string;
}
export async function DELETE(req:Request,{ params }: { params: IParams }) {
  try {
    const { userId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser?.currentUser || typeof userId !== "string")
      throw new Error("Invalid userID");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Invalid user");

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.filter(
      (userIdFollowing) => userIdFollowing !== user.id
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
