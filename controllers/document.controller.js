import Document from "../models/documents.model.js";

export const uploadDocument = async(req, res) => {
    try {
            if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file"
            });
        }
         const userId = req.user.id;

         const document = await Document.create({
            user_id: userId,
            title: req.body.title || req.file.originalname,
            file_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_path: req.file.path
        });

        return res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            data: document
        });


    } catch(err) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload document"
        });
    }
}