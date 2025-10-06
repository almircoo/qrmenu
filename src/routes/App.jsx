import React from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { Routes, Route, BrowserRouter } from "react-router"
import { Home } from '../pages/Home'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
export const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas publicas */}
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      
    </>
  )
}
