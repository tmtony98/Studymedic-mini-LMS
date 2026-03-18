
import { create } from 'zustand'
import { db } from '@/DB/data'
import { generateToken } from '@/lib/auth'




type User = {
  id: number
  name:string
  email:string
  password: string
}

type UserStoreType = {
  user: User | null
  login: (data:User) => Promise <User>
  logout:()=> void
  loading: boolean
}

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem("user")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

export  const userStore = create <UserStoreType>((set) => ({
user: getStoredUser(),
loading: false,
login:  async (data: User) => {
  set({ loading: true })
  await new Promise((res) => setTimeout(res, 500));
  const user = db.users.find(
    (u) => u.email === data.email && u.password === data.password,
  );
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  set({ user: { id: user.id, name: user.name, email: user.email, password: user.password } })
  set({ loading: false })
  return user;
}
,  
logout: async ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  set({ user: null })
  return true;

}
}))

