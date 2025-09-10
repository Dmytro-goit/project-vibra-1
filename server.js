// npm i express node-fetch
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // дозволяємо запити з фронтенду

app.get("/api/search", async (req, res) => {
  const q = req.query.q || "";
  try {
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`
    );
    const data = await response.json();
    res.json(data); // надсилаємо браузеру
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Deezer" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
