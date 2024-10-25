"use client"
import React, { useState } from "react";
import Link from "next/link";

import "./menu.css";

type PathList = {
	pathId: string;
	path: string;
	name: string;
}[];

export interface MenuProps {
	primary?: boolean;
	className?: string;
	size?: "small" | "medium" | "large";
	pathList: PathList;
	onClick?: () => void;
}

export const Menu = ({
	className,
	size = "medium",
	pathList,
	...props
}: MenuProps) => {
	const [menuSwitch,menuSwitchSet] = useState(false);
	const menuAction = () => {
		menuSwitchSet(!menuSwitch);
	}
	return (
		<div
			className={[`menu--${size}`, className, menuSwitch ? "open":"close"].join(" ",)}
			{...props}
		>
			<button className="menu relative rounded-lg" onClick={menuAction} >
				<span className="icon"></span>
				<span className="icon"></span>
				<span className="icon"></span>
			</button>
			<div className="menu-box fixed top-40 right-0 width-[140px]">
				{pathList.map((path) => <p className="menu-item" key={path.pathId}>
					<Link className="menu-link leading-none whitespace-nowrap overflow-hidden text-ellipsis p-2" href={path.path}>{path.name}</Link>
				</p>)}
			</div>
		</div>
	);
};
