import React, { useEffect } from "react";
import { type ReactNode, useRef, useState } from "react";
import { Button } from "../Button/Button";
import "./dialog.css";

export interface DialogProps {
	className?: string;
	size?: "small" | "medium" | "large";
	type: "icon" | "button" | "none";
	label?: string;
	ounterActionValue?: boolean;
	onChange?: (value: boolean) => void;
	children: ReactNode;
}

export const Dialog = ({
	className,
	size = "medium",
	label,
	type,
	ounterActionValue,
	onChange,
	children,
}: DialogProps) => {
	const dialogElement = useRef<HTMLDivElement>(null);
	const [dialogSwitch, dialogSwitchSet] = useState(false);
	const onChangeAction = onChange;
	let setClassName = "dialog p-2 rounded-lg";
	if (className) {
		setClassName += ` ${className}`;
	}
	if (size) {
		setClassName += ` ${size}`;
	}
	const switchAction = () => {
		if (onChangeAction) {
			onChangeAction(!dialogSwitch);
		}
		dialogSwitchSet(!dialogSwitch);
		if (dialogElement.current?.classList.contains("open")) {
			document.body.setAttribute("style", "");
			dialogElement.current?.classList.remove("open");
		} else {
			document.body.setAttribute("style", "overflow: hidden;");
			dialogElement.current?.classList.add("open");
		}
	};
	useEffect(() => {
		if(ounterActionValue) {
			switchAction();
		}
	},[ounterActionValue,switchAction]);
	return (
		<div className="dialog-box" ref={dialogElement}>
			{type === "icon" && (
				<button
					onClick={switchAction}
					className={
						type ? `button inline-block ${type}` : "button inline-block"
					}
				>
					{label ? label : "view"}
				</button>
			)}
			{type === "button" && (
				<Button
					label={label ?? "no label"}
					size="small"
					onClick={switchAction}
				/>
			)}
			<div className="overlay fixed top-0 left-0 bg-stone-900/90"></div>
			<div className={setClassName}>
				<button
					className="close-btn p-2 rounded-full bg-white"
					onClick={switchAction}
				>
					<span className="text-black">close</span>
				</button>
				<div className="dialog-inner">{children}</div>
			</div>
		</div>
	);
};
