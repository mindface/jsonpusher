import React from "react";
import NextLink from "next/link";

import "./link.css";

export interface CLinkProps {
	type: string;
	href: string;
	className?: string;
	size?: "small" | "medium" | "large";
	label: string;
}

export const CLink = ({
	type = "link",
	href,
	className,
	size = "medium",
	label,
	...props
}: CLinkProps) => {
	let mode = `clink--type-${type}`;
	if (className) {
		mode += ` ${className}`;
	}
	return (
		<div
			className="clink-box inline-block"
			{...props}
		>
			<NextLink href={href} className={["clink", `clink--${size}`, mode].join(" ")} >
				{label}
			</NextLink>
		</div>
	);
};
