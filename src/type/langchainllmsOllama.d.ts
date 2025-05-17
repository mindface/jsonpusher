declare module 'langchain/llms/ollama' {
  interface OllamaInput {
    model: string;
    temperature?: number;
    top_p?: number;
    stop?: string[];
    max_tokens?: number;
  }

  export class Ollama {
    constructor(fields: OllamaInput);

    invoke(input: string): Promise<string>;
  }
}