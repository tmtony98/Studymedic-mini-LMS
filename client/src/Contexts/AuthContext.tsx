// context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react"
import { login, verifyToken } from "../lib/auth"
import { generateToken } from "../lib/auth"



const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      const payload = verifyToken(token)

      if (payload) {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
      } else {
        logout()
      }
    }
  }, [])

  const loginUser = async (data) => {
    const user = await login(data)
    setUser(user)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}