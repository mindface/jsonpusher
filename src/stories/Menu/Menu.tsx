"use client";
import Link from "next/link";
import React, { useState } from "react";

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
	const [menuSwitch, menuSwitchSet] = useState(false);
	const menuAction = () => {
		menuSwitchSet(!menuSwitch);
		if(!menuSwitch) {
			document.body.setAttribute("style","overflow: hidden;");
		}else {
			document.body.setAttribute("style","");
		}
	};
	return (
		<>
		  {menuSwitch && <div className="overlay"
			  onClick={menuAction}
			></div>}
			<div
				className={[
					`menu--${size}`,
					className,
					menuSwitch ? "open" : "close",
				].join(" ")}
				{...props}
			>
				<button className="menu relative rounded-lg" onClick={menuAction}>
					<span className="icon"></span>
					<span className="icon"></span>
					<span className="icon"></span>
				</button>
				<div className="menu-box fixed top-40 right-0 overflow-hidden pt-2 pb-2">
					{pathList.map((path) => (
						<p className="menu-item" key={path.pathId}>
							<Link
								className="menu-link link leading-none whitespace-nowrap overflow-hidden text-ellipsis p-4"
								href={path.path}
							>
								{path.name}
							</Link>
						</p>
					))}
				</div>
			</div>
		</>
	);
};
