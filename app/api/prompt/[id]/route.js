import Prompt from "@models/prompt.model";
import { connectToDb } from "@utils/connectdb";

//GET prompt by ID
export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch propmt", { status: 500 });
  }
};

//PATCH to edit by ID
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("failed to edit prompt", { status: 500 });
  }
};

//DELETE prompt by ID
export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted succesfully", { status: 200 });
  } catch (error) {
    return new Response("failed to delete prompt", { status: 500 });
  }
};
