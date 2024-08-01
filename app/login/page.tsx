import { signIn } from "next-auth/react";
import React from "react";
import LoginButton from "../components/buttons/LoginButton";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginButton />
    </div>
  );
};

export default LoginPage;
