import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const bodyRequest = await request.json();
    const { body } = bodyRequest;

    if(!currentUser?.currentUser?.id) return NextResponse.error();

    const post = await prisma.post.create({
        data:{
            body,
            userId: currentUser.currentUser.id
        }
    });

    if(!post) return NextResponse.error()

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
