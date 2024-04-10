import Prompt from "@models/prompt.model";
import { connectToDb } from "@utils/connectdb";

export const POST = async (req) => {
  console.log("routing");
  const { userId, prompt, tag } = await req.json();
  await connectToDb();
  try {
    const NewPrompt = await Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await NewPrompt.save();

    return new Response(JSON.stringify(NewPrompt, { status: 201 }));
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
