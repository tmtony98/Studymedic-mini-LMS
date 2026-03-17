import React from "react";
import { SignupForm } from "@/components/SignupForm";
import { register } from "../services/Authservice"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { z } from "zod"

import { db, saveDB } from "../DB/data";


export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSignup = async (data: any) => {
    try {
      setLoading(true)
      await register(data)
      
      navigate("/")
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-sm">
            <SignupForm onSubmit={handleSignup} isLoading={loading} />
      </div>
    </div>
  )
}