"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {MdContentCopy,MdDone} from "react-icons/md"
import { usePathname, useRouter } from "next/navigation";
const PrpmptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setcopied] = useState("")
  const {data:session} =useSession()
  const router =useRouter()
  const pathName=usePathname()
  const handleCopy=()=>{
    setcopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setcopied(""),3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex  flex-row justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user"
            width={36}
            height={36}
            className="rounded-full object-contain"
          />{" "}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          {copied===post.prompt? <MdDone size={16} className="fill-primary-orange"/> : <MdContentCopy size={16} className="fill-primary-orange"/>}
        </div>
      </div>
      <p className="font-satoshi my-4 text-sm text-gray-700"> {post.prompt}</p>
      <p onClick= {()=> handleTagClick && handleTagClick(post.tag)} 
      className="font-inter  text-sm blue_gradient cursor-pointer"> # {post.tag}</p>
    
    {session?.user.id === post.creator._id && pathName === "/profile" && (
     <div>
     <hr className="mt-3 w-full"/>
        <div className='mt-2 flex-center gap-4 pt-3'>
         
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm text-red-600 cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
        </div>
      )}
    </div>
  );
};

export default PrpmptCard;
