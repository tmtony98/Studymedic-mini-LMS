import { createContext, useContext, useEffect, useState } from "react"
import { verifyToken } from "@/lib/auth"

type AuthContextType = {
  user: any
  loginUser: (user: any, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  
     const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  // 🔁 persist auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

 

    if (token && storedUser) {
      const valid = verifyToken(token)

      if (valid) {
        setUser(JSON.parse(storedUser))
      } else {
        logout()
      }
    }
  }, [])

  const loginUser = (user: any, token: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

 

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}