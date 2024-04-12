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
  const [posts, setposts] = useState([]);
  const [Feed, setFeed] = useState([]);
  //search Functionality
  const [searchText, setsearchText] = useState("");
  const [searchTimeout, setSearchtimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const FilterSearch = (searchtext) => {
    const regx = new RegExp(searchtext, "i");
    return posts.filter(
      (p) =>
        regx.test(p.creator.username) || regx.test(p.tag) || regx.test(p.prompt)
    );
  };
  //tagClick
  const tagClick = (tag) => {
    setsearchText(tag);
    const taggedRes = FilterSearch(tag);
    setSearchResults(taggedRes);
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);
    setSearchtimeout(
      setTimeout(() => {
        const searched = FilterSearch(e.target.value);
        setSearchResults(searched);
      }, 500)
    );
  };

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
          onChange={(e) => handleSearchChange(e)}
          required
        />
      </form>
      {searchText ? (
        <PromptlistCard data={searchResults} handleTagClick={tagClick} />
      ) : (
        <PromptlistCard data={posts} handleTagClick={tagClick} />
      )}
    </section>
  );
};

export default Feed;
