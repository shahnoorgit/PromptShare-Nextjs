"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const handleEdit = () => {};
  const handleDelete = () => {};
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
