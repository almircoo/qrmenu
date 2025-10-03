import React from 'react'
import { Routes, Route } from "react-router"
import { Home } from '../pages/Home'
export const App = () => {
  return (
    <>
      <Routes>
        {/* Rutas publicas */}
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  )
}
