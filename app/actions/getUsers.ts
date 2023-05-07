import prisma from '@/app/libs/prismadb';

export interface IUsersParams {
    limit?: number;
}

export default async function getUsers(params: IUsersParams) {
    try{
        const {limit} = params;

        const users = limit ?  await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: limit,
        }) : await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return users
    }catch(error) {

    }
}