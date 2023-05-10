'use client';

import { User } from "prisma/prisma-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AvatarProps {
    user?: User;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    user,
    isLarge,
    hasBorder
}) => {
    const router = useRouter();
    return (
        <div className={`
        ${hasBorder ? 'border-4 border-black': ''}
        ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
        rounded-full hover:opacity-90 transition
        cursor-pointer relative`}>
            <Image 
                fill style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}

                alt="Avatar"
                onClick={() => {router.push(`/users/${user?.id}`)}}
                src={user?.profileImage || '/images/avatar.png'}
            />
        </div>
    );
}

export default Avatar;