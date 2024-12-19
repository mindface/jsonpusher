import React from "react";

import "./titleline3h.css";

export interface Titleline3hProps {
	title: string;
	size?: "small" | "medium" | "large";
}

export const Titleline3h = ({ title, size = "medium" }: Titleline3hProps) => (
	<div className={`titleline3h-box p-2 ${size}`}>
		<h3 className="titleline3h inline-block relative">{title}</h3>
	</div>
);
