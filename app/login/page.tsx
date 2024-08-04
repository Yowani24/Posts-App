"use client";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      if (sessionData) {
        router.push("/");
      }
    };

    fetchSession();
  }, [router]);
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
