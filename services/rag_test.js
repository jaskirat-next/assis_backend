import "dotenv/config";
import { askQuestion } from "./ragService.js";


const result = await askQuestion(
    "how many casual leaves we can get in a year",
    1
)

console.log("Answer: ", result.answer);
console.log("Sources", result.sources)