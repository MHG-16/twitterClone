import React from 'react'
import PostClient from './PostClient'
import getPostById from '@/app/actions/getPostById';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    postId?: string;
}


const Postpage = async ({params} : {params: IParams}) => {
    const post = await getPostById(params);
    const user = await getCurrentUser();
    return (
    <PostClient post={post} user={user?.currentUser}/>
  )
}

export default Postpage