import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import router from "./routes/user.route.js";
import docRouter from "./routes/document.route.js";
import chatRouter from "./routes/chat.route.js";

dotenv.config()

const { default: sequelize } = await import("./config/database.js");

const app = express()

// app.use(cors())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json())

app.use("/api/auth", router)
app.use("/api/doc", docRouter)
app.use("/api/chat", chatRouter)

app.get("/", (req, res) => {
    res.json({
        message: "Node json server is running"
    })
})

console.log("hello")    
const PORT = process.env.PORT || 8016;

const startServer = async() => {
    try {
        await sequelize.authenticate();
        console.log("postggresql connected successfully");

        await sequelize.sync();
        console.log("Database tables are synchronized");

        app.listen(PORT, () => {
            console.log("Server is running on PORT", PORT)
        })

    } catch(err) {
        console.error(err)
    }
}

startServer();