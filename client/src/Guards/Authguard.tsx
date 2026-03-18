import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

function Authguard({ children }: { children: React.ReactNode }) {
  const { user, loading  } = useAuth();
  console.log("user" , user , "loading", loading);
  
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default Authguard
