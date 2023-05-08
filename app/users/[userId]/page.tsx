import getUserById from '@/app/actions/getUserById'
import Header from '@/app/components/share/Header';
import React from 'react'
import UserClient from './UserClient';
import UserBio from '@/app/components/user/UserBio';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    userId?: string
}
const page = async ({params} : {params: IParams}) => {
  const user = await getUserById(params);
  const currentUser = await getCurrentUser();
  if(!user) return <div className='text-white text-2xl text-center mt-4'>User not found</div>
  return (
    <div>
        <Header showBackArrow label={user?.name || "user Profile"} />
        <UserClient user={user} />
        <UserBio user={user} currentUser={currentUser}/>
    </div>
  )
}

export default page