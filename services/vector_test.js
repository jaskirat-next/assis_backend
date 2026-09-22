import DocumentChunk from "../models/documentChunks.model.js";
import { generateEmbeddings } from "./embeddingService.js";
import { saveEmbeddings } from "./vectorService.js";


const chunk = await DocumentChunk.findOne({
    order: [["id", "ASC"]]
})


if (!chunk) {
    throw new Error("No document chunks found");
}

console.log("Chunk ID:", chunk.id);
console.log("Chunk text:", chunk.content);

const embedding = await generateEmbeddings(chunk.content);

console.log("Embedding dimensions:", embedding.length);


await saveEmbeddings(chunk.id, embedding)
console.log("Embedding test completed");