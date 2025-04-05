import { vi } from 'vitest'; // または適切なテストライブラリ

export const createTestProps = <T extends object>(overrides?: Partial<T>): T => {
  const defaultProps = {
    className: '',
    onClick: vi.fn(), // jestの代わりにvitestを使用
    // その他の共通プロパティ
  };

  return {
    ...defaultProps,
    ...overrides,
  } as T;
};