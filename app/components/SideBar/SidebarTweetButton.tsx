'use client';

import { useRouter } from 'next/navigation'
import React from 'react'
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
  const router = useRouter();
  return (
    <div>
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