// server.js
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});