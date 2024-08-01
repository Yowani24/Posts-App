"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../components/Posts/PostTypes";
import { getPost } from "@/utils/getPost";
import Header from "@/app/components/Header";
import LoadingComponent from "@/app/components/LoadingComponent";

const PostDetails = ({ id }: { id: string }) => {
  const {
    data: post,
    error,
    isLoading,
  } = useQuery<PostType, Error>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  if (isLoading) return <LoadingComponent />;
  if (error) return <p>Alguma Inconsistência ocorreu.: {error.message}</p>;

  return (
    <section>
      <div className="fixed w-full bg-white">
        <Header headerTitleProps={post?.title as string} />
      </div>
      <article className="flex flex-wrap gap-2 p-4 pt-20">
        <div>{post?.body}</div>
      </article>
    </section>
  );
};

export default PostDetails;
