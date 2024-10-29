import React, { ReactNode } from "react";

import "./iconButton.css";

export interface IconButtonProps {
	primary?: boolean;
	className?: string;
	backgroundColor?: string;
	size?: "small" | "medium" | "large";
	label?: string;
	onClick?: () => void;
	children: ReactNode
}

export const IconButton = ({
	primary = false,
	className,
	size = "medium",
	backgroundColor,
	label,
	children,
	onClick,
}: IconButtonProps) => {
	let mode = primary
		? "iconbutton--primary"
		: "iconbutton--secondary";
	if (className) {
		mode += ` ${className}`;
	}
	return (
		<button
			type="button"
			className={["iconbutton", `iconbutton--${size}`, mode].join(
				" ",
			)}
			onClick={onClick}
		>
			{label}
			{children}
			<style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
		</button>
	);
};
