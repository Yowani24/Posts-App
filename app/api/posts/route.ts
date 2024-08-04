import { NextRequest, NextResponse } from "next/server";
import posts from "../../../fakeDb.json";

type Post = {
  id: string;
  title: string;
  body: string;
};

const postsData: Post[] = posts as Post[];
export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const { title, body } = await req.json();

  if (!title || !body) {
    return NextResponse.json(
      { message: "Título e conteúdo do post devem ser fornecidos." },
      { status: 400 }
    );
  }

  const newPost: Post = { id: String(postsData.length + 1), title, body };
  postsData.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, title, body } = await req.json();

  if (!id || !title || !body) {
    return NextResponse.json(
      { message: "ID, Título e conteúdo do post devem ser fornecidos." },
      { status: 400 }
    );
  }

  const postIndex = postsData.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return NextResponse.json(
      { message: "Post não encontrado" },
      { status: 404 }
    );
  }

  postsData[postIndex] = {
    id,
    title,
    body,
  };
  return NextResponse.json(postsData[postIndex], { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "ID do post deve ser fornecido." },
      { status: 400 }
    );
  }

  const postIndex = postsData.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return NextResponse.json(
      { message: "Post não encontrado" },
      { status: 404 }
    );
  }

  postsData.splice(postIndex, 1);

  return NextResponse.json(
    { message: "Post excluído com sucesso!" },
    { status: 200 }
  );
}
