import { Avatar } from 'antd'
import { Bell, Sun, User } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-end shadow-md bg-white items-center px-8 py-4'>
   
        <div className='flex item-center gap-8'>
            <Sun />
            <Bell />
            <Avatar size={28} icon={<User />} />
        </div>
    </nav>
  )
}

export default Navbar