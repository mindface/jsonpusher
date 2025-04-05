export class Calculator {
  // 大量データの処理をシミュレート
  static processLargeData(data: number[]): number {
    return data.reduce((sum, num) => sum + Math.pow(num, 2), 0);
  }

  // パフォーマンス計測付きの実行
  static async measureProcessing(data: number[]): Promise<{result: number, executionTime: number}> {
    const start = performance.now();
    const result = this.processLargeData(data);
    const end = performance.now();

    return {
      result,
      executionTime: end - start
    };
  }
} 