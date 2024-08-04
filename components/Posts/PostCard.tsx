import React from "react";
import { PostType } from "./PostTypes";
import LinkButton from "./LinkButton";

const PostCard = ({ id, title, body }: PostType) => {
  return (
    <div
      key={id}
      className="flex flex-col justify-between bg-[#fafbfc] border-4 border-white w-full md:w-[19.2rem] h-40 rounded-xl shadow-sm hover:shadow-md transition-all p-2"
    >
      <div className="flex itecms-center justify-between">
        <p className="text-gray-500">
          {title.length > 40 ? `${title.substring(0, 20)}...` : title}
        </p>
        <LinkButton id={id} />
      </div>
      <p className="text-gray-600">
        {body.length > 40 ? `${body.substring(0, 40)}...` : body}
      </p>
    </div>
  );
};

export default PostCard;
