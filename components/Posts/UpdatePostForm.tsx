import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FormValues {
  id: string;
  title: string;
  body: string;
}

const UpdatePostForm = ({
  post,
  refetch,
}: {
  post: FormValues;
  refetch: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      id: post.id,
      title: post.title,
      body: post.body,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => axios.put("/api/posts", data),
    onSuccess: () => {
      reset();
      refetch();
    },
    onError: (error) => {
      console.error("Inconsistência ao atualizar post!!", error);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {mutation.isError && (
        <p className="text-red-500">Inconsistência ao atualizar post!!</p>
      )}
      {mutation.isSuccess && (
        <p className="text-green-500">Post atualizado com sucesso!!</p>
      )}
      <input type="hidden" {...register("id")} />
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-500">Título</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="p-1 px-2 rounded-md text-sm"
        />
      </div>
      <div className="flex flex-col space-y-1 w-full">
        <label className="text-sm text-gray-500">Conteúdo</label>
        <textarea
          {...register("body", { required: true })}
          className="p-1 px-2 rounded-md text-sm w-full min-h-44"
        />
      </div>
      <button
        type="submit"
        className="bg-sky-400 rounded-md text-white text-sm p-1 px-2"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Atualizando..." : "Atualizar"}
      </button>{" "}
    </form>
  );
};

export default UpdatePostForm;
