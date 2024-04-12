"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const router = useRouter();
  const handleEdit = (post) => {
    console.log("hiii", post);
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const isConfirmed = confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p.id !== post._id);
        setposts(filteredPosts);
        router.push("/");
      } catch (error) {}
    }
  };
  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await res.json();
      setposts(data);
    };
    if (session?.user.id) fetchpost();
  }, []);

  return (
    <Profile
      name="my"
      desc="hey there whatsup"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      Profile
    </Profile>
  );
};

export default MyProfile;
