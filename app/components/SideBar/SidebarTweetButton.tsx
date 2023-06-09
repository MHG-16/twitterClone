'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa';

interface SidebarTweetButtonProps {
  user?: User;
}

const SidebarTweetButton : React.FC<SidebarTweetButtonProps> = ({user}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    if(!user){
      return loginModal.onOpen();
    }
    router.push("/")
  }, [loginModal, router, user]);
  return (
    <div onClick={onClick}>
      <div className='mt-6 lg:hidden rounded-full 
    h-14 w-14 p-4 flex items-center bg-sky-500
    transition cursor-pointer'>
      <FaFeather size={24} color='white'/>
      </div>
      <div
        className='mt-6 hidden lg:block px-4 py-2 rounded-full
        bg-sky-500 hover:bg-opacity-90 cursor-pointer transition'
      >
        <p className='text-center font-semibold text-white text-lg'>
          Tweet
        </p>
      </div>
    </div>
  )
}

export default SidebarTweetButton