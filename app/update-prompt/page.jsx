"use client";

import { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams=useSearchParams()

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
const promptId=searchParams.get('id');

  useEffect(()=>{
    const getPromptData=async()=>{
        const response =await fetch(`/api/prompt/${promptId}`)
        const data=await response.json();
        console.log(response)
        setPost({
          prompt:data.prompt,
          tag:data.tag
        })
      }
      if (promptId)getPromptData()

},[promptId])


const updatePrompt = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!promptId) return alert("Missing PromptId!");

  try {
    const response = await fetch(`/api/prompt/${promptId}`, {
      method: "PATCH",
      body: JSON.stringify({
        prompt: post.prompt,
        tag: post.tag,
      }),
    });

    if (response.ok) {
      toast.success("Prompt is successfully Updated")
      router.push("/profile");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;