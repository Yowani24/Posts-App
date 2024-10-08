"use client";
import React from "react";

const ButtonComponent = ({ label }: { label: string }) => {
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
