import { User } from '@prisma/client'
import React from 'react';
import Image from 'next/image';
import Avatar from '@/app/components/share/Avatar';

interface UserClientProps{
    user: any
}
const UserClient : React.FC<UserClientProps> = ({user}) => {
  return (
    <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
            <Image src={user.coverImage} 
            fill alt="Cover Image" 
            style={{objectFit: 'cover'}}/>
        )}
        <div className='absolute -bottom-16 left-4'>
            <Avatar user={user} isLarge hasBorder />
        </div>
    </div>
  )
}

export default UserClient