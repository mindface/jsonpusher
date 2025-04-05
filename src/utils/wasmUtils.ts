import { useState, useCallback } from 'react';

// Wasmモジュールの型定義
type WasmModule = {
  calculate_performance: (data: number[]) => number;
  validate_data: (input: string) => boolean;
};

// モックWasmモジュール
export const mockWasmModule: WasmModule = {
  calculate_performance: (data: number[]) => {
    return data.reduce((sum, num) => sum + Math.pow(num, 2), 0);
  },
  validate_data: (input: string) => {
    return input.length > 0;
  }
};

// 初期化関数のモック
export const initWasm = async () => {
  try {
    // 実際のWasm初期化の代わりにタイムアウトをシミュレート
    await new Promise(resolve => setTimeout(resolve, 100));
    return true;
  } catch (error) {
    console.error('Wasm initialization failed:', error);
    return false;
  }
};

// Wasmの計算用カスタムフック
export const useWasmCalculation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const calculate = useCallback(async (data: number[]) => {
    setLoading(true);
    try {
      return mockWasmModule.calculate_performance(data);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { calculate, loading, error };
}; 