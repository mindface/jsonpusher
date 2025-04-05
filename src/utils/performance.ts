import { useWasmCalculation } from './wasmUtils';

export const measurePerformance = async (data: number[]) => {
  const { calculate } = useWasmCalculation();
  const start = performance.now();
  
  try {
    const result = await calculate(data);
    const end = performance.now();
    
    console.log(`計算実行時間: ${end - start}ms`);
    return result;
  } catch (error) {
    console.error('計算エラー:', error);
    throw error;
  }
}; 