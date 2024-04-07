import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className=" w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Discover And Share
        <br className=" max-md:hidden" />
        <span className=" orange_gradient">AI Powered Prompts</span>
      </h1>
      <p
        className=" desc text-center
      "
      >
        PromptShare is open source AI Prompting Tool For Modern World to
        Discover and Share, Creative AI Prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
