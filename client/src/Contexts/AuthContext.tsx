import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "@/lib/auth";

type AuthContextType = {
  user: any;
  loginUser: (user: any, token: string) => void;
  logout: () => void;
  loading: boolean; // ✅ add this
  fetchUser: () => Promise<void>; // ✅ add this
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // ✅ add this to allow manual loading control
  setUser: React.Dispatch<React.SetStateAction<any>>; // ✅ add this to allow manual user updates
};

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(true) // start true so guard waits for auth check

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")
        setLoading(true) // ✅ start loading
       console.log("token", token , "storeduser", storedUser);
       
        if (token && storedUser) {
          const valid = verifyToken(token)
          console.log("valid");
          
          if (valid) {
            setUser(JSON.parse(storedUser))
          } else {
             console.log("not valid");
            logout()
          }
        }
      } catch (err) {
        console.log("Error fetching user:", err)
        // logout() // clear any invalid session
      } finally {
        setLoading(false) // done checking
      }
    }
 
    fetchUser()
  }, [])



  return (
    <AuthContext.Provider value={{ user, logout, setUser ,loading, setLoading , }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
