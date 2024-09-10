// "use client";
// import { useQuery } from "@tanstack/react-query";
// import PostCard from "../components/Posts/PostCard";
// import { PostType } from "../components/Posts/PostTypes";
// import LoadingComponent from "../components/LoadingComponent";
// import Link from "next/link";
// import Header from "../components/Header";
// import { useEffect, useState } from "react";
// import { getSession } from "next-auth/react";
// import usersDb from "../usersDb.json";

// async function getPosts(): Promise<PostType[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Inconsistência ao carregar dados!!!");
//   }
//   return res.json();
// }

// async function getdataz() {
//   const res = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_limit=10"
//   );
// }

// export default function Home() {
//   const { data, error, isLoading } = useQuery<PostType[]>({
//     queryKey: ["posts"],
//     queryFn: getPosts,
//   });

//   const {
//     data: dataz,
//     error: errorz,
//     isLoading: isLoadingz,
//   } = useQuery({
//     queryKey: ["dataz"],
//     queryFn: getdataz,
//   });

//   const [session, setSession] = useState<any>(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const sessionData = await getSession();
//       setSession(sessionData);
//     };

//     fetchSession();
//   }, []);

//   const hasPermissionTocreatePost =
//     usersDb.find((user) => user.email === session?.user?.email)?.role ===
//     "admin";

//   if (isLoading) return <LoadingComponent />;
//   if (error) return <p>Alguma Inconsistência ocorreu.: {error.message}</p>;

//   if (isLoadingz) return <LoadingComponent />;

//   console.log("dataz: ", dataz);
//   return (
//     <main>
//       <div className="fixed w-full bg-white">
//         <Header headerTitleProps={"Página de posts"} />
//       </div>

//       <section className="flex flex-col gap-2 p-8 pt-20">
//         {hasPermissionTocreatePost && (
//           <div className="flex justify-end w-full">
//             <Link href="/new-post">
//               <div className="w-fit bg-[#f1f1f1] shadow-md px-2 rounded-md cursor-pointer text-gray-600 text-sm border-2 border-white">
//                 + Criar post
//               </div>
//             </Link>
//           </div>
//         )}

//         <div className="flex flex-wrap gap-2">
//           {data?.map((post: PostType) => (
//             <PostCard
//               key={post.id}
//               id={post.id}
//               title={post.title}
//               body={post.body}
//             />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

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
import Calendar from "@/components/Calender";

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

  const [page, setPage] = useState(5);
  async function getdataz(page: number): Promise<any[]> {
    // Adjust the type based on your expected data structure

    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=" + page
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data from JSONPlaceholder");
    }
    return res.json();
  }

  const {
    data: dataz,
    error: errorz,
    isLoading: isLoadingz,
    isFetching,
  } = useQuery<any[]>({
    // Adjust the type based on your expected data structure
    queryKey: ["dataz", page],
    queryFn: () => getdataz(page),
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

  if (isFetching) return <LoadingComponent />;
  if (errorz)
    return <p>Alguma Inconsistência ocorreu com dataz: {errorz.message}</p>;

  console.log("dataz: ", dataz);
  const initialDate = new Date(2024, 8, 10); // Example: Sept 10, 2024
  const endDate = new Date(2024, 8, 25); //
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

        {/* {dataz?.map((post: any) => (
          <>
            <div key={post.id}>{post.title}</div>
          </>
        ))}
        <div className="flex itecms-center gap-5">
          <button disabled={page === 5} onClick={() => setPage(page - 5)}>
            Prev
          </button>
          <button onClick={() => setPage(page + 5)}>Next</button>
        </div> */}
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">Activity Calendar</h1>
          <Calendar initialDate={initialDate} endDate={endDate} />
        </div>
      </section>
    </main>
  );
}
