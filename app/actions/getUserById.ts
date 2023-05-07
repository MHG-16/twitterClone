import prisma from "@/app/libs/prismadb";

interface IParams {
  userId?: string;
}

export default async function getUserById(params: IParams) {
  try {
    const { userId } = params;

    if (!userId) throw new Error("Invalid ID");

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return { ...existingUser, followersCount };
  } catch (error) {
    console.log(error);
  }
}
