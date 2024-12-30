import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());
app.post("/api/gemini-service", async (req, res) => {
  try {
    const { prompt } = req.body; // Extract prompt from the request body

    console.log(req.body);
    

    if (!prompt) {
      return res
        .status(400)
        .json({ error: "Prompt is required in the request body." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt); // Generate content using the prompt

    console.log('result', result.response.candidates[0].content.parts[0].text);
    

    res.json({ success: true, message: result.response.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Error generating content:", error);
    res
      .status(500)
      .json({ error: "Failed to generate content. Please try again." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
