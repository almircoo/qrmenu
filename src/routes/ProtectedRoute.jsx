import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  
  if(!token) {
    return  <Navigate to="/login" replace />
  }

  return children
}
