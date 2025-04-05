import { useEffect, useState } from 'react';

export const WasmTest = () => {
  const [result, setResult] = useState<number | null>(null);
  const [addResult, setAddResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testWasm = async () => {
      try {
        // モジュールを初期化
        const wasmModule = await (await import('wasm_calculator')).default();
        console.log('Wasm module loaded:', wasmModule);

        try {
          const sum = wasmModule.add_numbers(5, 3);
          setAddResult(sum);
          console.log('Addition completed:', sum);

          const calc = new (wasmModule as any).Calculator();
          const testData = new Float64Array([1, 2, 3, 4, 5]);
          const squareSum = calc.calculate_square_sum(testData);
          setResult(squareSum);
          console.log('Square sum completed:', squareSum);
        } catch (calcError) {
          console.error('Calculation error:', calcError);
          setError('計算中にエラーが発生しました');
        }
      } catch (initError) {
        console.error('Wasm initialization error:', initError);
        setError('Wasmの初期化に失敗しました');
      }

      try {
        console.log('Starting Wasm import...');
        const importedModule = await import('wasm_calculator');
        console.log('Imported module:', importedModule);
  
        const wasmModule = await importedModule.default();
        console.log('Initialized module:', wasmModule);
  
      } catch (error) {
        console.error('Detailed error:', error);
      }
    };

    testWasm();
  }, []);

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Wasm Test Results</h2>
      <div className="space-y-2">
        <p>Simple Addition (5 + 3): {addResult ?? 'Loading...'}</p>
        <p>Square Sum (1²+2²+3²+4²+5²): {result ?? 'Loading...'}</p>
      </div>
    </div>
  );
}; 