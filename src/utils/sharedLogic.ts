import { mockWasmModule } from './wasmUtils';

export const validateUserInput = async (input: string) => {
  // バックエンドと同じ検証ロジックをフロントエンドでも使用
  return mockWasmModule.validate_data(input);
}; 