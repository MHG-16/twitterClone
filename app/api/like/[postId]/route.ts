import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
}

export async function DELETE(
  _: Request,
  { params }: { params: IParams }
) {
  try {
    const { postId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return NextResponse.error();

    let updatedLikes = [...(post.likedIds || [])];

    updatedLikes = updatedLikes.filter((userId) => userId !== userId);

    const updatedPost = prisma.post.update({
        where:{
            id: postId
        },
        data: {
            likedIds: updatedLikes
        }
    });

    return NextResponse.json(updatedPost);

  } catch (error) {
    return NextResponse.error();
  }
}
