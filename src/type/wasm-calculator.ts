export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export class Calculator {
  calculate_square_sum(input: Float64Array): number {
    return input.reduce((acc, val) => acc + val * val, 0);
  }
  validate_data(input: string): boolean {
    return input.length > 0;
  }
}

export interface WasmModule {
  memory: WebAssembly.Memory;
  init(module_or_path?: InitInput): Promise<void>;
  add_numbers(a: number, b: number): number;
  Calculator: typeof Calculator;
}

const wasmModule: () => Promise<WasmModule> = async () => {
  return {
    memory: new WebAssembly.Memory({ initial: 1 }),
    init: async () => {},
    add_numbers: (a, b) => a + b,
    Calculator: Calculator,
  };
};

export interface Calculator {
  new(): {
    calculate_square_sum(input: Float64Array): number;
    validate_data(input: string): boolean;
  };
}

export interface InitOutput {
  memory: WebAssembly.Memory;
  Calculator: typeof Calculator;
  add_numbers: (a: number, b: number) => number;
}

export default wasmModule;