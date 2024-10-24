import "./input.css";

export interface InputProps {
	type: string;
	value: string;
	className?: string;
	size?: "small" | "medium" | "large";
	label?: string;
	min?: number;
	max?: number;
	onChange?: (value: string) => void;
}

export const Input = ({
	type,
  value,
	className,
	size = "medium",
	label,
	min = 0,
	max = 100,
	onChange,
}: InputProps) => {
	let setClassName = "input-inner p-2";
	if (className) {
		setClassName += ` ${className}`;
	}
	if (size) {
		setClassName += ` ${size}`;
	}
	return (
		<div className="input-box">
			<span className={setClassName}>
				{label &&<label className="label inline-block pr-4">{label}</label>}
				<input
					type={type}
          value={value}
					className="input p-2 rounded-lg"
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
