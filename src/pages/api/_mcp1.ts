// pages/api/mcp-handler.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { env, pipeline } from '@xenova/transformers'
const path = require('path');
const ort = require('onnxruntime-node');
// import { Ollama } from 'ollama';
import { OpenAIEmbeddings, OpenAI } from '@langchain/openai';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { RetrievalQAChain } from 'langchain/chains';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers'
// import { ChromaStore } from "@langchain/community/vectorstores/chroma/store";
import { Ollama } from "langchain/llms/ollama";

let vectorStore: Chroma | null = null

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }
    const mcpRequest = req.body
    // if (!vectorStore) {
    //   const embeddings = new OpenAIEmbeddings();
    //   vectorStore = await Chroma.fromTexts(
    //     [
    //       'Next.jsはReactベースのフレームワークです。',
    //       'VercelはNext.jsの公式ホスティングプロバイダです。',
    //       'LangChainはLLMアプリケーション構築のためのライブラリです。'
    //     ],
    //     [{ id: 'doc1' }, { id: 'doc2' }, { id: 'doc3' }],
    //     embeddings,
    //     {
    //       collectionName: 'my-collection',
    //     }
    //   );
    // }
    // if(!vectorStore) {
    //   return res.status(500).json({ error: 'Vector store not initialized' })
    // }
    //   const retriever = new VectorStoreRetriever({
    //     vectorStore,
    //     k: 3,
    //   })
    //   const llm = new OpenAI({
    //     modelName: 'gpt-3.5-turbo',
    //     temperature: 0.2,
    //   })
    //   // RAG用Chain構築
    //   const chain = RetrievalQAChain.fromLLM(llm, retriever);

    //   // 実行
    //   const response = await chain.invoke({
    //     query: '情報の評価計数を教えてください',
    //   });

    //   if (mcpRequest?.type !== 'generateText') {
    //     return res.status(400).json({ error: 'Invalid MCP request type' })
    //   }

    //   const prompt = mcpRequest.payload.prompt;

    //   const result = await getGenerator()
    //   // const result = await generator(prompt, generationParams)

    //   console.log(result)
    //   const mcpResponse = {
    //     type: 'textGenerated',
    //     payload: {
    //       generatedText: result[0]?.generated_text,
    //     },
    //   }
    const question = "question";
    if (!question) return res.status(400).json({ error: 'No question' })

    if (!vectorStore) {
      const embeddings = new HuggingFaceTransformersEmbeddings({
        modelName: 'sentence-transformers/all-MiniLM-L6-v2',
      })
  
      vectorStore = await Chroma.fromExistingCollection(
        embeddings, 
        {
          collectionName: 'langchain',
          collectionMetadata: {
            'chromadb_dir': './chroma_store'
          }
          // persistDirectory: './chroma_store'
        },
       )
    }
  
    // const retriever = vectorStore.asRetriever()
    // const llm = new Ollama({
    //   model: 'llama3', // ローカルに ollama pull llama3 済みならOK
    // })

    const retriever = vectorStore.asRetriever()
    const llm = new Ollama({
      model: 'llama3',
    })
  

    try {
      const chain = RetrievalQAChain.fromLLM(llm, retriever)
      const response = await chain.invoke({ query: question })
      console.log(response)
  
      res.status(200).json({ result: response.message.content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to communicate with Ollama' });
    }
  
    // const chain = RetrievalQAChain.fromLLM(llm, retriever)
  
    // const response = await chain.invoke({ query: question })
  

  res.status(200).json("mcpResponse");
}
