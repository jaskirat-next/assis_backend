import "dotenv/config";
import { generateEmbeddings } from "./embeddingService.js";
import { searchSimilarChunks } from "./vectorSearchService.js";

const question = "casual leave";

console.log("question", question);

const queryEmbedding = await generateEmbeddings(question);

console.log("quesry dimensions", queryEmbedding.length);

const result = await searchSimilarChunks(queryEmbedding, 5);

result.forEach((result, index) => {
    console.log(`--- Result ${index + 1} ---`);
    console.log("Chunk ID:", result.id);
    console.log("Document ID:", result.document_id);
    console.log("Chunk Index:", result.chunk_index);
    console.log("Similarity:", result.similarity);
    console.log("Content:", result.content);
    console.log();
});