import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export const generateEmbeddings = async (text) => {
    try {
        const response = await ai.models.embedContent({
            model: "gemini-embedding-2",
            contents: text
        })

        return response.embeddings[0].values
    } catch(err) {
         console.error("Embedding generation error:", err);

        throw new Error("Failed to generate embedding");
    }
}