import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ API route
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  console.log("🛠️ Prompt received:", prompt);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply }); // ✅ frontend expects { reply: "..." }

  } catch (error) {
    console.error('❌ Chat API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Serve React build
//const buildPath = path.resolve(__dirname, '..', 'build');
//app.use(express.static(buildPath));

// ✅ Catch-all route
//app.get('*', (req, res) => {
  //res.sendFile(path.join(buildPath, 'index.html'));
//});

app.get('/api/chat', (req, res) => {
  res.json({ message: '✅ Backend is running!' });
});

// ✅ Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
