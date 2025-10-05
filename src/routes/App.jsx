import React from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { Routes, Route, BrowserRouter } from "react-router"
import { Home } from '../pages/Home'
export const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas publicas */}
            <Route path='/' element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      
    </>
  )
}
