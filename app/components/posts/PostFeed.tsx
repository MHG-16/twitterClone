'use client';

import { Post, User } from '@prisma/client';
import React from 'react';
import PostItem from './PostItem';

interface PostFeedProps{
    posts: any;
}

const PostFeed : React.FC<PostFeedProps> = ({posts}) => {
  return (
    <>
        {posts.map((post: any) => (
            <PostItem key={post.id} user={post.user} data={post}/>
        ))}
    </>
  )
}

export default PostFeed