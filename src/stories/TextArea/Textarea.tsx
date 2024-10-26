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
			{label && label}
			<textarea
				className={setClassName}
				rows={rows}
				cols={cols}
				value={value}
				onChange={(e) => {
					if (onChange) {
						onChange(e.target.value);
					}
				}}
			/>
		</div>
	);
};
