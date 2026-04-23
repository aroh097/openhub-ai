const express = require("express");
const path = require("path");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Frontend serve
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chat API
app.post("/chat", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: req.body.message }]
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.json({ reply: "Error: " + err.message });
  }
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
