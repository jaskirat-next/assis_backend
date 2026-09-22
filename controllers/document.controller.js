import DocumentChunk from "../models/documentChunks.model.js";
import Document from "../models/documents.model.js";
import { chunkText } from "../services/chunkService.js";
import { generateEmbeddings } from "../services/embeddingService.js";
import { extractTextFromPDF } from "../services/pdfService.js";
import { saveEmbeddings } from "../services/vectorService.js";


export const uploadDocument = async(req, res) => {
    try {
            if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file"
            });
        }
         const userId = req.user.id;

         const text = await extractTextFromPDF(req.file.path)

         const document = await Document.create({
            user_id: userId,
            title: req.body.title || req.file.originalname,
            file_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_path: req.file.path,
            content: text
        });

        const chunks = chunkText(text)
        console.log("Total chunks", chunks.length);

        for(let i=0; i< chunks.length; i++) {
           const chunk =  await DocumentChunk.create({
                document_id: document.id,
                chunk_index: i,
                content: chunks[i]
            })

            const embedding = await generateEmbeddings(chunks[i]);

            await saveEmbeddings(chunk.id, embedding )
            console.log(`Embedding saved for chunk ${chunk.id}`);
        }

         return res.status(201).json({
            message: "Document uploaded and processed successfully",
            data: {
                document,
                total_chunks: chunks.length
            }
         })

    } catch(err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Failed to upload document"
        });
    }
}