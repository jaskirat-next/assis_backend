import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadDocument } from "../controllers/document.controller.js";

const docRouter  = express.Router();

docRouter.post("/uploadContent", auth, upload.single("file"), uploadDocument)

export default docRouter;