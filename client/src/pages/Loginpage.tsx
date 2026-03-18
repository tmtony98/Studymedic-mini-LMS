import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userStore } from "../Store/Authstore";


function Loginpage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = userStore((state) => state.login)

  const handleLogin = async (data: any) => {
    setLoading(true)
    try {
      const user = await login(data)
      if (user) {
        navigate("/profile")
      }
    } catch (err) {
      console.log("error", err);
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
