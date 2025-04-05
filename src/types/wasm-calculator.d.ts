declare module '*wasm_calculator' {
  export interface WasmCalculator {
    Calculator: {
      new(): {
        calculate_square_sum(input: Float64Array): number;
        validate_data(input: string): boolean;
      };
    };
    add_numbers(a: number, b: number): number;
    init(): Promise<void>;
  }

  const module: WasmCalculator;
  export default module;
} 