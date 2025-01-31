import { useEffect, useState } from "react";
import "./textCommenter.css";

export interface TextCommenterProps {
	className?: string;
	values: string[];
	speed: number;
	interval?: number;
}

export const TextCommenter = ({
	className,
	values,
	speed = 100,
	interval = 2000,
}: TextCommenterProps) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	let setClassName = "text-commenter p-2 rounded-lg";
	if (className) {
		setClassName += ` ${className}`;
	}

	useEffect(() => {
		const textArray = values[currentIndex].split("");
		setDisplayedText("");
		let index = 0;
		let setText = "";

		const typing = () => {
			if (index < textArray.length) {
				setText = setText + textArray[index];
				setDisplayedText(setText);
				index++;
				setTimeout(typing, speed);
			}
		};
		typing();

		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
			setDisplayedText("");
		}, interval);

		return () => clearInterval(intervalId);
	}, [values, speed, interval, currentIndex]);

	return (
		<div className="text-commenter-box">
			<div className={setClassName}>{displayedText}</div>
		</div>
	);
};
