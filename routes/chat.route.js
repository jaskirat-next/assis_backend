import express from "express";
import { ask } from "../controllers/chat.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.post("/",auth, ask)

export default chatRouter