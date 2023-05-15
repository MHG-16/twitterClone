'use client';

import React from 'react';
import PostItem from './PostItem';

interface PostFeedProps{
    posts: any;
    userId?: string;
}

const PostFeed : React.FC<PostFeedProps> = ({posts, userId}) => {
  return (
    <>
        {posts.map((post: any) => (
            <PostItem key={post.id} userId={userId} data={post}/>
        ))}
    </>
  )
}

export default PostFeed