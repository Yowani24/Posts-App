"use client";
import Link from "next/link";
import React from "react";
import { RiExpandDiagonalLine } from "react-icons/ri";

const LinkButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/post/${id}`}>
      <div className="group flex items-center justify-center cursor-pointer w-7 min-h-7 bg-[#2e55a81c] rounded-full transition-all">
        <RiExpandDiagonalLine className="text-gray-500 group-hover:text-teal-500" />
      </div>
    </Link>
  );
};

export default LinkButton;
