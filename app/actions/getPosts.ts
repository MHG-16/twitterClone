import prisma from "@/app/libs/prismadb";

export interface IParams {
  userId?: string;
}
export default async function getPosts(params: IParams) {
  const { userId } = params;
  let posts;

  if (userId) {
    posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    posts = await prisma.post.findMany({
        include:{
            user: true,
            comments: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
  }

  return posts;
}
