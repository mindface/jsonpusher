// pages/api/mcp-handler.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { env, pipeline } from '@xenova/transformers'
const path = require('path');
const ort = require('onnxruntime-node');
import { Ollama } from 'ollama';
// import { Ollama } from "langchain/llms/ollama";

const ollama = new Ollama();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const question = "question";
  if (!question) return res.status(400).json({ error: 'No question' })
    try {
      const result = await ollama.chat({
        model: 'llama3.1:8b',
        messages: [{ role: 'user', content: "情報の評価フローについて教えてください" }],
      });
      console.log(result)
  
      res.status(200).json({ result: result.message.content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to communicate with Ollama' });
    }
  
  res.status(200).json("mcpResponse");
}
