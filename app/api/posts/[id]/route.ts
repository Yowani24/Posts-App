import { NextResponse } from "next/server";
import posts from "../../../../fakeDb.json";

type Post = {
  id: string;
  title: string;
  body: string;
};

const postsData: Post[] = posts as Post[];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (typeof id !== "string") {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  const post = postsData.find((post) => post.id === id);

  if (post) {
    return NextResponse.json(post, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Post não encontrado" },
      { status: 404 }
    );
  }
}
