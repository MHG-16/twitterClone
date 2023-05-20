'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import {  User } from '@prisma/client';
import {  formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import Avatar from '../share/Avatar';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import useLike from '@/app/hooks/useLike';


interface PostFeedProps{
    data: any;
    userId?: string ;
}
const PostItem : React.FC<PostFeedProps> = ({data, userId}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { isLiked, toggleLike} = useLike(data, userId);

  const LikeIcon = isLiked ? AiFillHeart : AiOutlineHeart;
  
  const goToUserProfile = useCallback((event: any) => {
    event.stopPropagation();

    router.push('/users/' + data.user.id);
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id]);


  const onLike = useCallback((event: any) => {
    event.stopPropagation();
    if(!userId) return loginModal.onOpen();
    toggleLike();
  }, [loginModal, toggleLike, userId]);

  const createdAt = useMemo(() => {
    if(!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data.createdAt])

    return (
    <div 
        onClick={goToPost}
        className='border-b-[1px] border-neutral-800 p-5
        cursor-pointer hover:bg-neutral-900 transition'
    >
        <div className='flex flex-row items-start gap-3'>
            <Avatar user={data.user}/>
            <div>
                <div
                    className='flex flex-row items-center gap-2'
                >
                    <p
                        className='text-white font-semibold
                        cursor-pointer hover:underline'
                        onClick={goToUserProfile}
                    >{data.user.name}</p>
                    <span className='text-neutral-500 cursor-pointer 
                    hover:underline hidden md:block'>
                        @{data.user.username}
                    </span>
                    <span className='text-slate-100 font-semibold'>
                      {createdAt}
                    </span>
                </div>
                <div className="text-white mt-1">
                  {data.body}
                </div>
                <div className="flex flex-row items-center mt-3 gap-10">
                  <div
                    className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer 
                    transition hover:text-sky-500'
                  >
                    <AiOutlineMessage size={20}/>
                    <p>
                      {data.comments.length || 0}
                    </p>
                  </div>
                  <div
                    className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer 
                    transition hover:text-red-500'
                    onClick={onLike}
                  >
                    <LikeIcon size={20} color={isLiked ? 'red' : ''}/>
                    <p>
                      {data.likedIds.length || 0}
                    </p>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem