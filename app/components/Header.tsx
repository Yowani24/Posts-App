"use client";
import React, { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = ({ headerTitleProps }: { headerTitleProps: string }) => {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      if (!sessionData) {
        router.push("/login");
      }
      setSession(sessionData);
    };

    fetchSession();
  }, []);
  return (
    <div className="flex items-center justify-between w-full h-16 bg-[#6aa1d85e] p-4">
      <h1 className="text-gray-600 font-bold">{headerTitleProps}</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-500 font-medium text-sm">
          {session?.user?.name}
        </span>
        {session?.user?.image && (
          <div className="w-7 h-7 bg-gtay-100 rounded-full border-2 border-white shadow-md overflow-hidden">
            <Image
              src={session?.user?.image ?? ""}
              layout="fixed"
              width={28}
              height={28}
              alt="avatar"
            />
          </div>
        )}

        <div
          onClick={() => signOut()}
          className="bg-[#f1f1f1] shadow-md px-2 rounded-md cursor-pointer text-gray-600 text-sm border-2 border-white"
        >
          sair
        </div>
      </div>
    </div>
  );
};

export default Header;
