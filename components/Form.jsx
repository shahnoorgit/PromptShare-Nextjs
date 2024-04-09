import React from "react";

const Form = ({ type, post, setPost, submiting, handleSubmit }) => {
  return (
    <section className=" flex-col flex-start w-full max-w-full ">
      <h1 className=" head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share your amazing prompts with the world, and let your
        imagination and let your imagination run wild with any ai platfrom
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-7 w-full max-w-2xl glassmorphism"
      >
        <label>
          <span className=" font-satoshi font-semibold text-gray-700 text-base">
            Your AI prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="write your AI prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className=" font-satoshi font-semibold text-gray-700 text-base">
            Tag
            <span className="text-normal">
              ( ex, #product #webdev #nature #tech)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
      </form>
    </section>
  );
};

export default Form;
