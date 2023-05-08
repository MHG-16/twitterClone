import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function POST(request: Request){

    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const body = await request.json();

    const {
        name,
        username,
        bio,
        profileImage,
        coverImage
    } = body

    const userEdited = await prisma.user.update({
        where: {
            id: currentUser.currentUser.id
        },
        data: {
            name,
            username,
            bio,
            profileImage,
            coverImage
        }
    });

    return NextResponse.json(userEdited);
}