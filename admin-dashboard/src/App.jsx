import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Layout from './container/Layout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import AllOrders from './pages/AllOrders'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Settings from './pages/Settings'
import AllProducts from './pages/AllProducts'
import Categories from './pages/Categories'
import Customers from './pages/Customers'
import { ProtectedRoutes } from './components/ProtectedRoutes'

const App = () => {
  return (
    <AuthProvider>
       <Router>
         <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={
              <ProtectedRoutes>
                <Layout />
              </ProtectedRoutes>
              }>
              <Route index element={<Dashboard />} />
              <Route path='profile' element={<Profile />} />
              <Route path='categories' element={<Categories /> } />
              <Route path='products' element={<AllProducts /> } />
              <Route path='customers' element={<Customers /> } />
              <Route path='settings' element={<Settings /> } />
              <Route path='orders' element={<AllOrders />} />
            </Route>
         </Routes>
      </Router> 
    </AuthProvider>
  )
}

export default App