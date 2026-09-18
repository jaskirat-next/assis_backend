import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/me", auth, (req, res) => {
    res.json({
        success: true,
        message: "Authenticated user",
        user: req.user
    });
});


export default router;