import "./textarea.css";

export interface TextareaProps {
	primary?: boolean;
	className?: string;
	outerClassName?: string;
	value: string;
	size?: "small" | "medium" | "large";
	rows?: number;
	cols?: number;
	label?: string;
	placeholder?: string;
	onChange?: (value: string) => void;
}

export const Textarea = ({
	className,
	outerClassName,
	size = "medium",
	rows = 10,
	cols = 30,
	value,
	label,
	placeholder,
	onChange,
}: TextareaProps) => {
	let setClassName = "textarea p-2 rounded-lg";
	if (className) {
		setClassName += ` ${className}`;
	}
	if (size) {
		setClassName += ` ${size}`;
	}
	return (
		<div className={`textarea-box ${outerClassName}`}>
			{label && <span className="inline-block pb-4">{label}</span>}
			<textarea
				className={setClassName}
				rows={rows}
				cols={cols}
				value={value}
				placeholder={placeholder}
				onChange={(e) => {
					if (onChange) {
						onChange(e.target.value);
					}
				}}
			/>
		</div>
	);
};
