import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(express.static(join(__dirname, 'public')));

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'No messages' });

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `Eres Flujo, un asesor financiero personal experto y empático para usuarios en Panamá. 
Analizas los datos financieros reales del usuario y das recomendaciones personalizadas, concretas y accionables usando sus números reales.
Responde en español, de forma conversacional pero profesional. Usa saltos de línea para facilitar la lectura.
Cuando hay datos suficientes, incluye cifras concretas. Sé directo, útil y motivador. Máximo 300 palabras.
Cuando analices tarjetas de crédito, menciona siempre el impacto real del interés y si conviene pagar más del mínimo.`,
      messages: messages.slice(-10)
    });
    res.json({ content: response.content[0].text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al contactar la IA' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Flujo corriendo en http://localhost:${PORT}`));
