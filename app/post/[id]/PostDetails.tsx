"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostType } from "../../../components/Posts/PostTypes";
import { getPost } from "@/utils/getPost";
import Header from "@/components/Header";
import LoadingComponent from "@/components/LoadingComponent";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import ModalComponent from "@/components/ModalComponent";
import UpdatePostForm from "@/components/Posts/UpdatePostForm";
import axios from "axios";
import { useRouter } from "next/navigation";

const PostDetails = ({ id }: { id: string }) => {
  const {
    data: post,
    error,
    isLoading,
    refetch,
  } = useQuery<PostType, Error>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (id: string) => axios.delete("/api/posts", { data: { id } }),
    onSuccess: () => {
      refetch();
      router.push("/");
    },
    onError: (error) => {
      console.error("Inconsistência ao deletar post!!", error);
    },
  });

  if (isLoading) return <LoadingComponent />;
  if (error) return <p>Alguma Inconsistência ocorreu.: {error.message}</p>;

  return (
    <section>
      <div className="fixed w-full bg-white">
        <Header headerTitleProps={post?.title as string} />
      </div>
      <article className="flex flex-wrap gap-2 p-4 pt-20">
        <div className="flex justify-end w-full gap-5">
          <ModalComponent
            modalTitle="Editando Post"
            buttonProps={
              <div className="group flex items-center justify-center cursor-pointer w-7 min-h-7 bg-[#2e55a81c] border-2 border-white rounded-full transition-all">
                <FaRegEdit
                  size={15}
                  className="text-gray-500 group-hover:text-blue-600 transition-all"
                />
              </div>
            }
          >
            <UpdatePostForm post={post as PostType} refetch={refetch} />
          </ModalComponent>

          <ModalComponent
            modalTitle="Excluindo Post"
            buttonProps={
              <div className="group flex items-center justify-center cursor-pointer w-7 min-h-7 bg-[#2e55a81c] border-2 border-white rounded-full transition-all">
                <MdDeleteForever className="text-red-500 group-hover:text-red-600 transition-all" />
              </div>
            }
          >
            <span>
              Essa ação não terá volta. <q>Quer continuar?</q>
            </span>
            <div className="w-full flex justify-end">
              <button
                onClick={() => mutation.mutate(post?.id as string)}
                className="bg-red-400 rounded-md text-white text-sm p-1 px-2"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Deletando..." : "Deletar"}
              </button>
            </div>
          </ModalComponent>
        </div>
        <div className="w-full bg-white text-gray-500 p-2 rounded-md">
          {post?.body}
        </div>
      </article>
    </section>
  );
};

export default PostDetails;
