import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex h-screen bg-gray-100'>
        <Sidebar />

        {/* Main Content */}
        <div className='flex flex-col flex-1'>
            <Navbar />

            <main className='p-6 overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Layout