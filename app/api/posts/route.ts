import { NextResponse } from "next/server";
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
