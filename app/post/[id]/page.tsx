import React from "react";
import PostDetails from "./PostDetails";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PostDetails id={id} />;
};

export default page;
