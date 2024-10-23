import React from "react";

import "./select.css";

type Option = {
	value: string;
	label: string;
};

export interface SelectProps {
	id: string;
	primary?: boolean;
	className?: string;
	label?: string;
	options: Option[];
	onChange?: (value:string) => void;
}

export const Select = ({
	id,
	primary = false,
	className,
	label,
	options,
	onChange,
	...props
}: SelectProps) => {
	let mode = primary
		? "select--primary"
		: "select--secondary";
	if (className) {
		mode += ` ${className}`;
	}
	return (
		<div className="select-box inline-block">
			{label && <span className="inline-block p-1">{label}</span>}
			<select
				className={["select", "rounded-lg","p-2", mode].join(
					" ",
				)}
				{...props}
				onChange={(e) => {
					if(onChange) {
						onChange(e.target.value)
					}
				}}
			>
				{options.map((option, index) => (
					<option key={`${id}${index}`} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
