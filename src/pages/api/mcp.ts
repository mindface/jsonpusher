// pages/api/mcp-handler.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { env, pipeline } from '@xenova/transformers'

if (env && env.backends) {
  env.localModelPath = './models/'
  env.allowRemoteModels = false;
}

const generationParams = {
  max_length: 300,          // 出力最大長（単語数）
  temperature: 1.0,         // 出力のランダムさ（1.0は普通、上げると自由度↑）
  top_p: 0.95,              // 確率フィルタリング（低いとまともな単語だけ）
  repetition_penalty: 1.1,  // 同じ言葉繰り返し防止（1.0より上にすると効果）
  do_sample: true,          // サンプリング有効（true推奨）
  num_return_sequences: 1,  // 何個出力するか
}


let generator: any;
async function getGenerator() {
  if (!generator) {
    try {
      generator = await pipeline(
        'text-generation','rinna/rinna-japanese-gpt2-xsmall-onnx', {
      });
    } catch (error) {
      console.error('Error loading model:', error)
      throw new Error('Model loading failed')  
    }
  }
  return generator
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const mcpRequest = req.body
  console.log(mcpRequest)

  if (mcpRequest?.type !== 'generateText') {
    return res.status(400).json({ error: 'Invalid MCP request type' })
  }

  const prompt = mcpRequest.payload.prompt;

  const generator = await getGenerator()
  const result = await generator(prompt, generationParams)
console.log(result)
  const mcpResponse = {
    type: 'textGenerated',
    payload: {
      generatedText: result[0]?.generated_text,
    },
  }

  res.status(200).json(mcpResponse);
}
