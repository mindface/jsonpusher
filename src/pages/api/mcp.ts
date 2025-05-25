// pages/api/mcp-handler.ts

import type { NextApiRequest, NextApiResponse } from 'next'
const path = require('path');
const ort = require('onnxruntime-node');
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { spawn } from 'child_process';
let vectorStore: Chroma | null = null

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const question = req.body.payload.prompt
    if (!question) return res.status(400).json({ error: 'No question provided' })
  
    const python = spawn('python3', ['py/run_llm.py'])

    let result = ''
    let error = ''
  
    python.stdin.write(JSON.stringify({ question: "評価と情報処理メカニズム" }))
    python.stdin.end()
  
    python.stdout.on('data', (data) => {
      result += data.toString()
      console.log("stdout:", data.toString())
    })

    python.stderr.on('data', (data) => {
      error += data.toString()
      console.error("stderr:", data.toString())
    })
  
    python.on('close', (code) => {
      if (code !== 0 || error) {
        return res.status(500).json({ error: error || 'Failed to run Python script' })
      }
      try {
        const parsed = JSON.parse(result)
        console.log(parsed)
        res.status(200).json(parsed)
      } catch (e) {
        res.status(500).json({ error: 'Failed to parse response from Python' })
      }
    })
  res.status(200).json("mcpResponse");
}
