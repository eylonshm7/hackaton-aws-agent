import express from "express";
import dotenv from "dotenv";
import { invokeAgent } from "./callAgent.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/callAgent", async (req, res) => {
  const { sessionId, inputText } = req.body;
  if (!sessionId || !inputText) {
    res.status(400).json({ message: "sessionId and inputText are required" });
  }
  const responseMessage = await invokeAgent({ sessionId, inputText });
  console.log("responseMessage =>", responseMessage);
  res.json({ message: responseMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
