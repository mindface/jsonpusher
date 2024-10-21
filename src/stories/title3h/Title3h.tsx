import React from "react";

import "./title3h.css";

export interface Title3hProps {
	title: string;
	size?: "small" | "medium" | "large";
}

export const Title3h = ({ title, size = "medium" }: Title3hProps) => (
	<div className={`title3h-box p-2 ${size}`}>
		<h3 className="title3h inline-block relative">{title}</h3>
	</div>
);
