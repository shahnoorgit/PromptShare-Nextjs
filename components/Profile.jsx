import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, handleEdit, handleDelete, data }) => {
  return (
    <section className="w-full">
      <h1 className=" head_text text-left">
        <span className=" blue_gradient">{name}Profile</span>
      </h1>
      <p className="text-left desc ">{desc}</p>
      <div className=" mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
