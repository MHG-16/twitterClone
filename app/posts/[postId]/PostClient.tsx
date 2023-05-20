import React from 'react';

import Form from '@/app/components/form/Form';
import CommentFeed from '@/app/components/posts/CommentFeed';
import PostItem from '@/app/components/posts/PostItem';
import Header from '@/app/components/share/Header';


interface PostClientProps {
  post?: any
  user?: any;
}

const PostClient : React.FC<PostClientProps> = ({ post, user }) => {
  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={post} userId={user?.currentUser.id}/>
      <CommentFeed comments={post.comments} user={user}/>
      <Form 
        postId={post.id as string}
        isComment
        placeholder='Tweet your reply' 
        currentUser={user}      
      />
    </>
  )
}

export default PostClient