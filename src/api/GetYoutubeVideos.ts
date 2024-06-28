"use server";
import { OpenAIRequest } from "./interface";
import OpenAI from "openai";

async function GetYoutubeVideos({ amount, query }: OpenAIRequest) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.log("No OpenAI API key found");
    }
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `\
                You are a friendly AI here to help find YouTube videos.
                You will return the videos in an array of items like this: 
                {videos: [{title: "title", url: "URL"}]}, and make sure it is JSON parseable.
                You will search only for videos from the last year, and you will not return any video that is not in English or Bahasa Indonesia. 
                Additionally, you will ensure that the videos are available in the user's country.
                You will not give any response other than the JSON format specified.`,
                name: "system"
            },
            {
                role: "user",
                content: `give me ${amount} YouTube links about ${query}`,
                name: "user"
            }
        ]
    });

    return (completion.choices[0]);
}

export { GetYoutubeVideos }