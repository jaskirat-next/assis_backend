import sequelize from "../config/database.js";

export const searchSimilarChunks = async (queryEmbedding, limit=5) => {
    try {
        const vector = `[${queryEmbedding.join(",")}]`;

        const [results] = await sequelize.query(
            `SELECT
                id,
                document_id,
                chunk_index,
                content,
                1 - (
                    embedding <=> CAST(:embedding AS vector)
                ) AS similarity
                FROM document_chunks
                WHERE embedding IS NOT NULL
                ORDER BY embedding <=> CAST(:embedding AS vector)
                LIMIT :limit
            `,
            {
                replacements: {
                    embedding: vector,
                    limit
                }
            }
        ) 

        return results;
    } catch(err) {
        console.error("Vector search error:", err);
        message: "Failed to search similar chunks"
    }
}