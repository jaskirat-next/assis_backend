import express from "express";
import dotenv from "dotenv"
import router from "./routes/user.route.js";

dotenv.config()

const { default: sequelize } = await import("./config/database.js");

const app = express()

app.use(express.json())

app.use("/api/auth", router)

app.get("/", (req, res) => {
    res.json({
        message: "Node json server is running"
    })
})

console.log("hello")    
const PORT = process.env.PORT

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