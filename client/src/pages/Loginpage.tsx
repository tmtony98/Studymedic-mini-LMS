import React, { use, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/Authservice";
import { useAuth } from "../Contexts/AuthContext";


function Loginpage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser , setLoading: setAuthLoading } = useAuth();
 
  type handleloginType = ()=> void

 

  const handleLogin:handleloginType = async (data:any)=>{
    setLoading(true)
    try{
      const user = await login(data)
      setUser(user) // ✅ update context with user data
       navigate("/profile")
       setLoading(false)

    }catch(err){
      console.log("error", err);
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
