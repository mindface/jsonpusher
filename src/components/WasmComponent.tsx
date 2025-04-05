import { useEffect, useState } from 'react';
import { useWasmCalculation } from '../utils/wasmUtils';

export const WasmComponent = () => {
  const [result, setResult] = useState<number>(0);
  const { calculate } = useWasmCalculation();

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const calculation = await calculate([1, 2, 3]);
        setResult(calculation);
      } catch (error) {
        console.error('Wasm calculation failed:', error);
      }
    };

    loadWasm();
  }, [calculate]);

  return <div>{result}</div>;
}; 