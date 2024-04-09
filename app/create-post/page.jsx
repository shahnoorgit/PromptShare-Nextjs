"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const page = () => {
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });
  const { submiting, setSubmiting } = useState(false);
  const createPrompt = (e) => {};
  return (
    <Form
      type="Create"
      post={post}
      setPost={setpost}
      submiting={submiting}
      handleSubmit={createPrompt}
    />
  );
};

export default page;
