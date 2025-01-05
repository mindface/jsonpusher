import "./input.css";

export interface InputProps {
	type: string;
	value: string;
	outerClassName?: string;
	className?: string;
	size?: "small" | "medium" | "large";
	label?: string;
	min?: number;
	max?: number;
	onChange?: (value: string | FileList) => void;
}

export const Input = ({
	type,
	value,
	outerClassName,
	className,
	size = "medium",
	label,
	min = 0,
	max = 100,
	onChange,
}: InputProps) => {
	let setClassName = "input-inner block p-2";
	const setInputSizeClass = className?.match(/w-full/g) ? "pb-4" : "pr-4";
	if (outerClassName) {
		setClassName += ` ${outerClassName}`;
	}
	if (size) {
		setClassName += ` ${size}`;
	}
	return (
		<div className="input-box">
			<span className={setClassName}>
				{label && <label className={["label","inline-block",setInputSizeClass].join(" ")}>{label}</label>}
				<input
					type={type}
					value={value}
					className={["input", "p-2", "rounded-lg", type ?? "", className ?? ""].join(" ")}
					min={min}
					max={max}
					onChange={(e) => {
						if (type === "file" && onChange && e.target.files) {
							onChange(e.target.files);
						} else if (onChange) {
							onChange(e.target.value);
						}
					}}
				/>
			</span>
		</div>
	);
};
