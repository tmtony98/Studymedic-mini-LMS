import React from 'react'
import { Navigate } from 'react-router-dom'
import { userStore } from '../Store/Authstore';


function Authguard({ children }: { children: React.ReactNode }) {
 
  const user = userStore((state) => state.user)
  const loading = userStore((state) => state.loading) // Assuming login function sets loading state
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
