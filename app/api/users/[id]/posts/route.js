import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const { id } = await params;

        const prompts = await Prompt.find({
            creator:  id
        }).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500});
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        const { id } = await params; 

        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt) {
            return new Response("Prompt not found", {
                status: 404
            })
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
    } catch (error) {
        return new Response("Server error", {
            status: 500
        })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const { id } = await params;
        await Prompt.findByIdAndRemove(id);

        return new Response("Prompt deleted successfully", {
            status: 200,
        } )
    } catch (errror) {
        return new Response("Server error", {
            status: 500
        });
    }
}