import { generateEmbeddings } from "./embeddingService.js";
import { generateAnswer } from "./generationService.js";
import { searchSimilarChunks } from "./vectorSearchService.js";

export const askQuestion = async (question, userId) => {
    try {
        const queryEmbedding = await generateEmbeddings(question)
        console.log("Query embedding generated");

        const chunks = await searchSimilarChunks(queryEmbedding,userId, 5);    
        console.log("Relevant chunks found:", chunks.length);

        const context = chunks.map(chunk => chunk.content).join("\n\n")

        console.log("Context created");

        const answer = await generateAnswer(question, context);

        console.log("Answer generated")

        return  {
            answer,
            sources: chunks
        }
    } catch(err) {
        console.error("RAG service error:", err);
        message: "Failed to process question"

    }
}