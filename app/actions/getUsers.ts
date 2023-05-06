import prisma from '@/app/libs/prismadb';

export interface IUsersParams {
    userId?: string;
}

export default async function getUsers(params: IUsersParams) {
    try{
        const {userId} = params;
        if(!userId) throw new Error('Invalid ID');

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const followedUserCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })

        return({...existingUser, followedUserCount})
    }catch(error) {

    }
}