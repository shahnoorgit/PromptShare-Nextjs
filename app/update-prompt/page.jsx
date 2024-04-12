"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPage = () => {
  const router = useRouter();
  const [submiting, setSubmiting] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });
  console.log(promptId);
  useEffect(() => {
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      console.log("data here", data);
      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPrompt();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    if (!promptId) return "no prompt Id found";
    setSubmiting(true);
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <Form
      type="Update"
      post={post}
      setPost={setpost}
      submiting={submiting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPage;
