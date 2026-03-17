import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { generateToken } from "@/lib/auth";

function Loginpage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

const handleLogin = async (data: {
  email: string
  password: string
}) => {
  try {
    setLoading(true)

    // simulate API delay
    await new Promise((res) => setTimeout(res, 500))

    // 🔥 get latest db from localStorage
    const stored = localStorage.getItem("db")
    const parsedDB = stored ? JSON.parse(stored) : { users: [] }

    const user = parsedDB.users.find(
      (u: any) =>
        u.email === data.email.toLowerCase().trim() &&
        u.password === data.password
    )

    if (!user) throw new Error("Invalid credentials")

    // 🔐 generate fake JWT
    const token = generateToken(user)

    // ✅ store session
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    navigate("/profile")
  } catch (err: any) {
    alert(err.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm onSubmit={handleLogin} isLoading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
