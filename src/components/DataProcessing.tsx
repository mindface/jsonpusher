import { useWasmCalculation } from '../utils/wasmUtils';
import { useState, useEffect } from "react";

export const DataProcessing = ({ data }: { data: number[] }) => {
  const [result, setResult] = useState<number>(0);
  const { calculate } = useWasmCalculation();

  useEffect(() => {
    const processData = async () => {
      const calculation = await calculate(data);
      setResult(calculation);
    };
    processData();
  }, [data, calculate]);

  return <div>計算結果: {result}</div>;
}; 