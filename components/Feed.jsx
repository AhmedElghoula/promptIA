"use client";
import { useEffect, useState } from "react";
import PrpmptCard from "./PrpmptCard";

const PrpmptCardList = ({ data, handleTagClick }) => {
  return <div className="mt-16 prompt_layout">
    {data.map((post)=>(
      <PrpmptCard
      key={post._id}
      post={post}
      handleTagClick={handleTagClick}
      />
    ))}
  </div>
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const handleSearch = (e) => {
    setsearch(e.target.value);
  };
  const fetchPosts=async()=>{
    const res = await fetch('/api/prompt');
    const data=await res.json();
    setPosts(data);
   }
  useEffect(() => {
 
   fetchPosts();
  }, [])
  
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };


 
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PrpmptCardList
          data={searchedResults}
          
        />
      ) : (
        <PrpmptCardList data={posts} />
      )}
    </section>
  );
};

export default Feed;
