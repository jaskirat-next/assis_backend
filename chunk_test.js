import { chunkText } from "./services/chunkService.js";

const text = `
Artificial Intelligence is a field of computer science.
Machine learning is a subset of artificial intelligence.
Retrieval Augmented Generation combines retrieval with generation.
`;

const chunks = chunkText(text, 100, 20);

console.log("Total chunks:", chunks.length);

chunks.forEach((chunk, index) => {
    console.log(`\n--- Chunk ${index + 1} ---`);
    console.log(chunk);
});