import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export const generateAnswer = async (question, context) => {
    const prompt = `
    Answer the user's question using only the provided context.
    Context:
    ${context}

    Question:
    ${question}

    If the answer is not present in the context, say:
    "I could not find the answer in the provided documents."

    Answer:
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return response.text;
}