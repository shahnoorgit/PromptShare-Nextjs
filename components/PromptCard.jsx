"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ handleTagClick, post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const handleUserProfile = (post) => {
    router.push(`/user-profile/${post.creator._id}`);
  };
  return (
    <div className="prompt_card">
      <div className=" flex justify-between items-start gap-5">
        <div
          onClick={() => handleUserProfile(post)}
          className="flex-1 cursor-pointer flex justify-start items-center gap-5"
        >
          <Image
            src={post?.creator.image}
            alt="author pic"
            width={40}
            height={40}
            className=" rounded-full object-contain"
          />
          <div className="flex flex-col gap-2">
            <p className=" font-satoshi font-semibold text-gray-950">
              {post?.creator.username}
            </p>
            <p className=" font-inter text-sm text-gray-500">
              {post?.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className=" py-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className=" font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {(session?.user.id === post?.creator._id && pathname === "/profile") ||
        (pathname === `/user-profile/${session?.user.id}` && (
          <div className=" mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
            <p
              className=" font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className=" font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        ))}
    </div>
  );
};

export default PromptCard;
