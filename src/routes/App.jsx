import React from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from './ProtectedRoute'

import { Routes, Route, BrowserRouter } from "react-router"
import { Home } from '../pages/Home'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Places } from '@/pages/Places'

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

            <Route path='/places' element={<ProtectedRoute><Places/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      
    </>
  )
}
