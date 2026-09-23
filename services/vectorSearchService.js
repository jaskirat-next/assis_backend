import sequelize from "../config/database.js";

export const searchSimilarChunks = async (queryEmbedding,userId, limit=5, threshold = 0.70) => {
    try {
        const vector = `[${queryEmbedding.join(",")}]`;

        const [results] = await sequelize.query(
            `SELECT
                document_chunks.id,
                document_chunks.document_id,
                document_chunks.chunk_index,
                document_chunks.content,
                1 - (
                    embedding <=> CAST(:embedding AS vector)
                ) AS similarity
                FROM document_chunks
                JOIN documents
                    ON documents.id = document_chunks.document_id
                WHERE embedding IS NOT NULL
                    AND documents.user_id = :userId

                    AND 1 - (
                        document_chunks.embedding <=> CAST(:embedding AS vector)
                    ) >= :threshold
                ORDER BY embedding <=> CAST(:embedding AS vector)
                LIMIT :limit    
            `,
            {
                replacements: {
                    embedding: vector,
                    userId,
                    limit,
                    threshold
                }
            }
        ) 

        return results;
    } catch(err) {
        console.error("Vector search error:", err);
        message: "Failed to search similar chunks"
    }
}