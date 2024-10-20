
import './textarea.css';

export interface TextareaProps {
  primary?: boolean;
  className?: string;
  value: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  onChange?: (value: string) => void;
}

export const Textarea = ({
  className,
  size = 'medium',
  value,
  label,
  onChange
}: TextareaProps) => {
  let setClassName = "textarea p-2 rounded-lg";
  if(className) {
    setClassName += ` ${className}`;
  }
  if(size) {
    setClassName += ` ${size}`;
  }
  return (
    <div className="textarea-box">
      {label && label}
      <textarea
        className={setClassName}
        rows={10}
        cols={30}
        value={value}
        onChange={(e) => {
          if(onChange) {
            onChange(e.target.value)
          }
        }}
      />
    </div>
  );
};
