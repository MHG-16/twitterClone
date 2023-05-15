import Form from '@/app/components/form/Form';
import PostItem from '@/app/components/posts/PostItem';
import Header from '@/app/components/share/Header';
import { Post, User, Comment } from '@prisma/client';
import React from 'react';

interface PostClientProps {
  post?: any
  user?: any;
}

const PostClient : React.FC<PostClientProps> = ({ post, user }) => {
  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={post} userId={user?.currentUser.id}/>
      <Form 
        postId={post.postId as string}
        isComment
        placeholder='Tweet your reply' 
        currentUser={user}      
      />
    </>
  )
}

export default PostClient