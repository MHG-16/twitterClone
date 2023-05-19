import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";;

import prisma from '@/app/libs/prismadb';

interface IParams {
    postId?: string;
}


export async function POST(request: Request, { params } : {params: IParams}){
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser?.currentUser){
            throw new Error('Auth Error');
        }
        const body = await request.json();
        const { postId } = params;
        if(!postId || typeof postId !== 'string'){
            throw new Error('Invalid Id');
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.currentUser.id,
                postId
            }
        });

        NextResponse.json(comment);
    }catch(error){
        return NextResponse.error();
    }
}