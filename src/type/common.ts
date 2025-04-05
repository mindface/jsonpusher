// 共通で使用する型定義
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ItemProps extends BaseProps {
  id: string;
  title: string;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface SectionProps extends BaseProps {
  title: string;
  description?: string;
} 