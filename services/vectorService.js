import sequelize from "../config/database.js";

export const saveEmbeddings = async (chunkId, embeddings) => {
    try {
        const vector = `[${embeddings.join(",")}]`

        await sequelize.query(
            
        `
        UPDATE document_chunks
        SET embedding = CAST(:embedding AS vector)
        where id = :chunkId
        `,
        {
            replacements: {
                embedding: vector,
                chunkId
            }
        }
        );

        console.log(`Embedding saved for chunk: ${chunkId}`)
    } catch (err) {
        console.error("Error saving embedding:", err);
        throw new Error("Failed to save embedding");
    }
}