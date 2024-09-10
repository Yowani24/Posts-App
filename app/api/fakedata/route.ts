import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
    .then((res) => NextResponse.json(res.data));
}
