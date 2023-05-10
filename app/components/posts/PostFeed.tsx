'use client';

import { Post, User } from '@prisma/client';
import React from 'react';
import PostItem from './PostItem';

interface PostFeedProps{
    posts: any;
    user?: User
}

const PostFeed : React.FC<PostFeedProps> = ({posts, user}) => {
  return (
    <>
        {posts.map((post: Post) => (
            <PostItem key={post.id} user={user} data={post}/>
        ))}
    </>
  )
}

export default PostFeed