
import './inputRange.css';

export interface InputRangeProps {
  primary?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  onChange?: (value: string) => void;
}

export const InputRange = ({
  className,
  size = 'medium',
  label,
  onChange
}: InputRangeProps) => {
  let setClassName = "inputrange-inner p-2 rounded-lg";
  if(className) {
    setClassName += ` ${className}`;
  }
  if(size) {
    setClassName += ` ${size}`;
  }
  return (
    <div className="inputrange-box">
      {label && label}
      <span className={setClassName}>
        <input
          type="range"
          className="inputrange"
          name="volume"
          min="0"
          max="100"
          onChange={(e) => {
            if(onChange) {
              onChange(e.target.value)
            }
          }}
        />
      </span>
    </div>
  );
};
