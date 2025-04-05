import { useState } from 'react';
import { Calculator } from '../utils/calculator';

export const PerformanceDemo = () => {
  const [result, setResult] = useState<{
    result: number;
    executionTime: number;
  } | null>(null);

  const runDemo = async () => {
    // 100万個の要素を持つ配列を生成
    const testData = Array.from({ length: 1000000 }, (_, i) => i);
    const performance = await Calculator.measureProcessing(testData);
    setResult(performance);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">パフォーマンステスト</h2>
      <button
        onClick={runDemo}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        テスト実行
      </button>
      {result && (
        <div className="mt-4">
          <p>計算結果: {result.result}</p>
          <p>実行時間: {result.executionTime.toFixed(2)}ms</p>
        </div>
      )}
    </div>
  );
}; 