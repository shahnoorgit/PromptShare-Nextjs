import Prompt from "@models/prompt.model";
import { connectToDb } from "@utils/connectdb";

export const GET = async (req) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch propmts", { status: 500 });
  }
};
