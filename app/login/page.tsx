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
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url(${"/login_bg.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="backdrop-blur-md bg-white/30 w-full h-screen p-4 rounded-xl flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
