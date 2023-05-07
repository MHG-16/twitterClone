import React from 'react'

import Sidebar from './SideBar/Sidebar'
import { FollowBar } from './FlowBar/FollowBar'
import { User } from '@prisma/client'


interface LayoutProps {
    children: React.ReactNode,
    user: any,
    users: User[]

}

const Layout : React.FC<LayoutProps> = ({children, user, users}) => {

  return (
    <div className='h-screen bg-black'>
        <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            <div className="grid grid-cols-4 h-full">
                <Sidebar user={user} />
                <div className="col-span-3 lg:col-span-2 
                border-x-[1px] border-neutral-800">
                    {children}
                </div>
                <FollowBar users={users}/>
            </div>
        </div>
    </div>
  )
}

export default Layout