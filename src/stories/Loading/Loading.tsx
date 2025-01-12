import React from "react";

import "./loading.css";

export interface LoadingProps {
	className?: string;
	backgroundColor?: string;
	size?: "small" | "medium" | "large";
}

export const Loading = ({
	className,
	size = "medium",
	backgroundColor = "",
}: LoadingProps) => {
	let mode = "";
	if (className) {
		mode += ` ${className}`;
	}
	return (
		<div className={["loading-box", `loading--${size}`, mode].join(" ")}>
			<div className="loading">
				<svg viewBox="0 0 30 30">
					<rect
						rx="1.5"
						x="13.5"
						className="loading-path _no1"
						fill={backgroundColor}
					/>
					<rect
						rx="1.5"
						transform="rotate(45 22.425 7.576)"
						x="20.925"
						y="3.075"
						fill={backgroundColor}
						className="loading-path _no2"
					/>
					<rect
						rx="1.5"
						transform="rotate(90 25.5 15)"
						x="24"
						y="10.5"
						fill={backgroundColor}
						className="loading-path _no3"
					/>
					<rect
						rx="1.5"
						transform="rotate(-45)"
						x="-1.5"
						y="28"
						fill={backgroundColor}
						className="loading-path _no4"
					/>
					<rect
						rx="1.5"
						x="13.5"
						y="21"
						fill={backgroundColor}
						className="loading-path _no5"
					/>
					<rect
						rx="1.5"
						transform="rotate(45)"
						x="19.5"
						y="6"
						fill={backgroundColor}
						className="loading-path _no6"
					/>
					<rect
						rx="1.5"
						transform="rotate(90 4.5 15)"
						x="3"
						y="10.5"
						fill={backgroundColor}
						className="loading-path _no7"
					/>
					<rect
						rx="1.5"
						transform="rotate(135 7.576 7.575)"
						x="6.075"
						y="3.075"
						fill={backgroundColor}
						className="loading-path _no8"
					/>
				</svg>
			</div>
		</div>
	);
};
