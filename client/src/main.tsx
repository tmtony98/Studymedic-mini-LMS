import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage"
import { SignupForm } from "./components/SignupForm"


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/signup" element={<SignupForm/>} />
    </Routes>
      <App/>
    </BrowserRouter>
  
  </StrictMode>,
)
