import { User } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import useLoginModal from '@/app/hooks/useLoginModal';

interface SidebarItemProps {
    label:string;
    href?: string;
    icon:IconType;
    onClick?: () => void;
    currentUser?: User;
    auth: boolean;
}

const SidebarItem : React.FC<SidebarItemProps> = ({
    label,
    href,
    icon : Icon,
    onClick,
    currentUser, auth
}
) => {
  
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();

    if (auth && !currentUser) return loginModal.onOpen();
    if (href) return router.push(href);
    
  }, [router, href, onClick, loginModal, currentUser, auth]) 
  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
        <div className='relative rounded-full h-14
        w-14 flex items-center justify-center p-4
        hover:bg-slate-300 hover:bg-opacity-10 
        cursor-pointer lg:hidden'>
            <Icon size={28} color='white'/>
        </div>
        <div className="relative hidden lg:flex items-row
        gap-4 p-4 rounded-full hover:bg-slate-300
        hover:bg-opacity-10 cursor-pointer">
            <Icon size={28} color='white'/>
            <p className='text-white text-xl'>{label}</p>
        </div>
    </div>
  )
}

export default SidebarItem