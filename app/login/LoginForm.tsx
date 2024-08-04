"use client";
import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";

const LoginForm = ({}) => {
  function handleSbmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });
  }
  return (
    <div className="bg-white shadow-md w-full sm:w-[300px] p-4 rounded-xl">
      <h1 className="text-sm font-medium text-gray-500 text-center my-2">
        LOGIN
      </h1>
      <form onSubmit={handleSbmit} className="flex flex-col">
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-500">Email</label>
          <input
            className="p-2 rounded-md text-gray-500"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex flex-col space-y-1 mt-4">
          <label className="text-sm text-gray-500">Senha</label>
          <input
            className="p-2 rounded-md text-gray-500"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-sky-400 hover:bg-sky-500 text-white font-bold p-1 rounded-md w-20 self-center mt-5 text-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
