import getUserById from '@/app/actions/getUserById'
import Header from '@/app/components/share/Header';
import React from 'react'
import UserClient from './UserClient';
import UserBio from '@/app/components/user/UserBio';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPosts from '@/app/actions/getPosts';
import PostFeed from '@/app/components/posts/PostFeed';

interface IParams {
    userId?: string
}
const page = async ({params} : {params: IParams}) => {
  const user = await getUserById(params);
  const currentUser = await getCurrentUser();
  const postsByUser = await getPosts({userId: user?.id})
  if(!user) return <div className='text-white text-2xl text-center mt-4'>User not found</div>
  return (
    <div>
        <Header showBackArrow label={user?.name || "user Profile"} />
        <UserClient user={user} />
        <UserBio user={user} currentUser={currentUser}/>
        <PostFeed posts={postsByUser} />
    </div>
  )
}

export default page