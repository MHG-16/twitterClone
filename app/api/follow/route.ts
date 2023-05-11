import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(req : Request){
    try {
        const body = await req.json();
        const { userId } = body;

        const currentUser = await getCurrentUser();

        if(!currentUser?.currentUser || typeof userId !== 'string')
            throw new Error('Invalid userID');
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user) throw new Error('Invalid user');

        let updatedFollowingIds = [...(user.followingIds || [])];

        updatedFollowingIds.push(userId);

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });

        return NextResponse.json(updatedUser)

    }catch(error){

    }

}

export async function DELETE(req: Request){
    const body = await req.json();
        const { userId } = body;

        const currentUser = await getCurrentUser();

        if(!currentUser?.currentUser || typeof userId !== 'string')
            throw new Error('Invalid userID');
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user) throw new Error('Invalid user');

        let updatedFollowingIds = [...(user.followingIds || [])];

        updatedFollowingIds.filter(userIdFollowing => userIdFollowing !== user.id);

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });

        return NextResponse.json(updatedUser)
}