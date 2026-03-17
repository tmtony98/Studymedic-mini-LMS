import React from "react";
import { SignupForm } from "@/components/SignupForm";

function Signupform() {
  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Signupform;
