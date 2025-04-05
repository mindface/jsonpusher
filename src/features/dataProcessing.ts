import { useWasmCalculation } from '../utils/wasmUtils';

const normalCalculation = (data: number[]): number[] => {
  return data.map(x => x * 2); // 例として単純な計算を実装
};

export const processLargeDataSet = async (data: number[]) => {
  const { calculate } = useWasmCalculation();
  
  if (data.length > 10000) {
    // 大量データはWasmで処理
    return await calculate(data);
  }
  // 少量データはJSで処理
  return normalCalculation(data);
}; 