import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromPDF = async (filePath) => {
    try {
        const fileBuffer = new Uint8Array(
            fs.readFileSync(filePath)
        );


        const pdf = await pdfjsLib.getDocument({
            data: fileBuffer
        }).promise;

        let extractedText = "";

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);

            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map(item => item.str)
                .join(" ");

            extractedText += pageText + "\n";
        }

        return extractedText.trim();

    } catch (err) {
        console.error("PDF extraction error:", err);
        throw new Error("Failed to extract text from PDF");
    }
};