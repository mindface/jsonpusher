// import { calculate_heavy_task } from '../../wasm/pkg';

// モックの計算関数
const calculate_heavy_task = (data: Float64Array): number => {
  return Array.from(data).reduce((sum, num) => sum + Math.pow(num, 2), 0);
};

export const performCalculation = async (data: number[]) => {
  // Float64Array に変換してWasmに渡す
  const float64Array = new Float64Array(data);
  return calculate_heavy_task(float64Array);
}; 