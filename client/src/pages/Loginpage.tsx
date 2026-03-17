import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginApi } from "../services/All

function Loginpage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      console.log("Sending to API:", data);
        await LoginApi
      // 🔥 API call
      // await axios.post("/api/login", data)

      // success
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
