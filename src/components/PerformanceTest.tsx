import { useState, useEffect } from 'react';
import { measurePerformance } from '../utils/performance';

export const PerformanceTest = () => {
  const [result, setResult] = useState<number | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const runTest = async () => {
    // テストデータの生成
    const testData = Array.from({ length: 1000000 }, (_, i) => i);
    
    const start = performance.now();
    const calculationResult = await measurePerformance(testData);
    const end = performance.now();

    setResult(calculationResult);
    setExecutionTime(end - start);
  };

  return (
    <div className="p-4">
      <button 
        onClick={runTest}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        パフォーマンステスト実行
      </button>
      {result !== null && (
        <div className="mt-4">
          <p>計算結果: {result}</p>
          <p>実行時間: {executionTime}ms</p>
        </div>
      )}
    </div>
  );
}; 