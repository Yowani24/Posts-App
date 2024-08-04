"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import ButtonComponent from "../../components/buttons/ButtonComponent";
import { useMutation } from "@tanstack/react-query";

interface FormValues {
  title: string;
  body: string;
}

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Inconsistência ao criar post!!");
      }
      return response.json();
    },

    onError: (error: Error) => {
      setError(error.message);
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen px-5">
      <div className="bg-white w-[500px] h-auto p-6 rounded-xl shadow-2xl">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              {...register("title", { required: "Título é obrigatório." })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Conteúdo</label>
            <textarea
              {...register("body", { required: "Conteúdo é obrigatório" })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body.message}</p>
            )}
          </div>
          <ButtonComponent label="Criar" />
        </form>
      </div>
    </div>
  );
};

export default NewPost;
