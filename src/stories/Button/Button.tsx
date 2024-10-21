import React from "react";

import "./button.css";

export interface ButtonProps {
	primary?: boolean;
	className?: string;
	backgroundColor?: string;
	size?: "small" | "medium" | "large";
	label: string;
	onClick?: () => void;
}

export const Button = ({
	primary = false,
	className,
	size = "medium",
	backgroundColor,
	label,
	...props
}: ButtonProps) => {
	let mode = primary
		? "storybook-button--primary"
		: "storybook-button--secondary";
	if (className) {
		mode += ` ${className}`;
	}
	return (
		<button
			type="button"
			className={["storybook-button", `storybook-button--${size}`, mode].join(
				" ",
			)}
			{...props}
		>
			{label}
			<style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
		</button>
	);
};
