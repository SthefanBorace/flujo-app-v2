const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta IA
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // 🔥 Validación clave
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: 'API key no configurada'
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY.trim();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 Manejo de errores de la API
    if (!response.ok) {
      console.error("Error API:", data);
      return res.status(500).json({
        error: data.error?.message || 'Error con la API'
      });
    }

    const reply = data.content?.[0]?.text || "No hubo respuesta.";

    res.json({ reply });

  } catch (error) {
    console.error("Error servidor:", error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// Puerto Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
