"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptlistCard = ({ data, handleTagClick }) => {
  return (
    <div className=" mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setposts] = useState([]);
  const handleSearchChange = () => {};

  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setposts(data);
    };
    fetchpost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or a User"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptlistCard data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
