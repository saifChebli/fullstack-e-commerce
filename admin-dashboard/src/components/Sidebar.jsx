import { Button, Divider } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

const linkClass = ({isActive}) => isActive ? "block px-4 py-2 rounded bg-blue-600 text-white" : "block px-4 py-2 rounded hover:bg-gray-200"


  return (
    <aside className='w-64 bg-white p-4 shadow-md'>
           <div className='mb-8'>
                  <h3 className='font-bold'>MongoTango</h3>
              </div>
        <nav className='space-y-2'>
            <NavLink to="/dashboard" className={linkClass}>
                Dashboard
            </NavLink>
            <NavLink to="/dashboard/products" className={linkClass}>
              Products
            </NavLink>
             <NavLink to="/dashboard/categories" className={linkClass}>
              Categories
            </NavLink>
              <NavLink to="/dashboard/orders" className={linkClass}>
                Orders
            </NavLink>
             <NavLink to="/dashboard/customers" className={linkClass}>
                Customers
            </NavLink>

            <Divider />

            <div className='mt-10'>
            <NavLink to="/dashboard/settings" className={linkClass}>
               Settings
            </NavLink>
             <NavLink to="/" className={linkClass}>
               {/* <Button> */}
                  Logout
               {/* </Button> */}
            </NavLink>
            </div>
        </nav>
    </aside>
  )
}

export default Sidebar