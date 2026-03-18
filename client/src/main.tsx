import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/Profilepage";
import Authguard from "./Guards/Authguard";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/landing" element={<App />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<Authguard><ProfilePage /></Authguard>} />
         
        </Routes>
      </BrowserRouter>
  </StrictMode>,
);
