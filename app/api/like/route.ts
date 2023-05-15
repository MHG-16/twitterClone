import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) return NextResponse.error();

    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log(post)

    if (!post) return NextResponse.error();

    let updatedLikes = [...(post.likedIds || [])];

    updatedLikes.push(currentUser.currentUser.id);

    const updatedPost = await prisma.post.update({
        where:{
            id: postId
        },
        data: {
            likedIds: updatedLikes
        }
    });

    return NextResponse.json(updatedPost)
    
  } catch (error: any) {
    return NextResponse.error();
  }
}
