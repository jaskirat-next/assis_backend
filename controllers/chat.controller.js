import { askQuestion } from "../services/ragService.js";

export const ask = async (req, res) => {
    try {
        const {question} = req.body;
     if (!question || !question.trim()) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

    const userId = req.user.id;

    const result = await askQuestion(question, userId, 5);

    return res.status(200).json({
            success: true,
            answer: result.answer,
            sources: result.sources
        });
    } catch(err) {
        console.error("Chat controller error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to process question"
        });
    }
    

    

}