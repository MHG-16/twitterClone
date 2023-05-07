import { User } from "prisma/prisma-client";
import Image from "next/image";

interface AvatarProps {
    user: User;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    user,
    isLarge,
    hasBorder
}) => {
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
                onClick={() => {}}
                src={user?.profileImage || '/images/avatar.png'}
            />
        </div>
    );
}

export default Avatar;