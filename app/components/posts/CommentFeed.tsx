import React from 'react';

import { Comment, User } from '@prisma/client';
import CommentItem from './CommentItem';

interface CommentFeedProps {
    comments?: Comment[];
    user?: User
}

const CommentFeed : React.FC<CommentFeedProps> = ({comments, user}) => {
  return (
    <>
        <h2 className='text-slate-100 font-bold text-xl pt-5 pl-5'>Comments</h2>
        {comments?.map((comment) => 
            <CommentItem key={comment.id} data={comment} user={user}/>
        )}
    </>
  )
}

export default CommentFeed