import React, { useState } from "react";

import "./Ccheck.css";

export interface CcheckProps {
	partsId: string;
	primary?: boolean;
	backgroundColor?: string;
	size?: "small" | "medium" | "large";
	label: string;
	onClick?: () => void;
	changing: (check: boolean) => void;
}

export const Ccheck = ({
	partsId,
	primary = false,
	size = "medium",
	backgroundColor,
	label,
	changing,
	...props
}: CcheckProps) => {
	const [checker, checkerSet] = useState(false);
	const mode = primary ? "ccheck--primary" : "ccheck--secondary";
	return (
		<div className="ccheck">
			<input
				type="checkbox"
				id={`${partsId}-item`}
				className="input"
				checked={checker}
				onChange={(e) => {
					checkerSet(e.target.checked);
					changing(e.target.checked);
				}}
				hidden
			/>
			<label
				htmlFor={`${partsId}-item`}
				className={["label ccheck", `ccheck--${size}`, mode].join(" ")}
				{...props}
			>
				{label}
				{backgroundColor && (
					<style jsx>{`
          button {
            background-color: ${backgroundColor};
          }
        `}</style>
				)}
			</label>
		</div>
	);
};
