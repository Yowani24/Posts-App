"use client";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../components/Posts/PostCard";
import { PostType } from "../components/Posts/PostTypes";
import LoadingComponent from "../components/LoadingComponent";
import Link from "next/link";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import usersDb from "../usersDb.json";

async function getPosts(): Promise<PostType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Inconsistência ao carregar dados!!!");
  }
  return res.json();
}

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  const hasPermissionTocreatePost =
    usersDb.find((user) => user.email === session?.user?.email)?.role ===
    "admin";

  if (isLoading) return <LoadingComponent />;
  if (error) return <p>Alguma Inconsistência ocorreu.: {error.message}</p>;

  return (
    <main>
      <div className="fixed w-full bg-white">
        <Header headerTitleProps={"Página de posts"} />
      </div>

      <section className="flex flex-col gap-2 p-8 pt-20">
        {hasPermissionTocreatePost && (
          <div className="flex justify-end w-full">
            <Link href="/new-post">
              <div className="w-fit bg-[#f1f1f1] shadow-md px-2 rounded-md cursor-pointer text-gray-600 text-sm border-2 border-white">
                + Criar post
              </div>
            </Link>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {data?.map((post: PostType) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
