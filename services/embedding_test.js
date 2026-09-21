import "dotenv/config";

import { generateEmbeddings } from "./embeddingService.js";

const text = "Employees are eligible for casual leave.";

const embeddings = await generateEmbeddings(text);

console.log("Embeddings generated");
console.log("Dimensions", embeddings.length);
console.log(embeddings)