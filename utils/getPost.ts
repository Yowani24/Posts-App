export async function getPost(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`
  );

  if (!res.ok) {
    throw new Error("Inconsistência ao carregar dados!!");
  }
  return res.json();
}
