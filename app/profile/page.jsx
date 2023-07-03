"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { toast } from "react-hot-toast";
const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id.toString()}`);
  };
  const handleDelete = async (post) => {
    console.log(process.env.DB_URL)
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filterPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filterPosts);
        toast.success("Prompt is successfully deleted")
      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your PromptIA profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
