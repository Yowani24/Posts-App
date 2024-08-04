"use client";
import { signIn } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-blue-500 text-white rounded-md px-2 py-1"
    >
      Entrar com sua conta google
    </button>
  );
};

export default LoginButton;
