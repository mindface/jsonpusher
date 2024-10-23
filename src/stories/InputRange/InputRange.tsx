import "./inputRange.css";

export interface InputRangeProps {
	value: number;
	className?: string;
	size?: "small" | "medium" | "large";
	label?: string;
	min?: number;
	max?: number;
	onChange?: (value: string) => void;
}

export const InputRange = ({
  value,
	className,
	size = "medium",
	label,
	min = 0,
	max = 100,
	onChange,
}: InputRangeProps) => {
	let setClassName = "inputrange-inner p-2 rounded-lg";
	if (className) {
		setClassName += ` ${className}`;
	}
	if (size) {
		setClassName += ` ${size}`;
	}
	return (
		<div className="inputrange-box">
			{label && label}
			<span className={setClassName}>
				<input
					type="range"
          value={value}
					className="inputrange"
					name="volume"
					min={min}
					max={max}
					onChange={(e) => {
						if (onChange) {
							onChange(e.target.value);
						}
					}}
				/>
			</span>
		</div>
	);
};
