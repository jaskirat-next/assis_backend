export const chunkText = (text, chunkSize = 1000, overlap = 200) => {

    if (!text || typeof text !== "string") {
        throw new Error("Text must be a non-empty string");
    }

    if (overlap >= chunkSize) {
        throw new Error("Overlap must be smaller than chunk size");
    }

    if (overlap < 0) {
        throw new Error("Overlap cannot be negative");
    }

    const chunks = [];

    let start = 0;

    while (start < text.length) {

        const end = Math.min(start + chunkSize, text.length);

        const chunk = text.slice(start, end).trim();

        if (chunk.length > 0) {
            chunks.push(chunk);
        }

        start += chunkSize - overlap;
    }

    return chunks;
};