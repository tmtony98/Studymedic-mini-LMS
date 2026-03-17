import { createContext, useContext, useEffect, useState } from "react"
import { verifyToken } from "@/lib/auth"

type AuthContextType = {
  user: any
  loginUser: (user: any, token: string) => void
  logout: () => void
  loading: boolean // ✅ add this
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true) // ✅ NEW

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

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

    setLoading(false) // ✅ VERY IMPORTANT
  }, [])

  const loginUser = (user: any, token: string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}