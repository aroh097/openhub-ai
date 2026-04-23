const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Open Hub AI Server is Running");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
