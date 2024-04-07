import "@styles/globals.css";

export const metadata = {
  title: "PromptShares",
  description:
    "This WebApp is made to share amazing prompts that we can use while using ChatGPT",
};
const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className=" main">
          <div className=" gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default Rootlayout;
