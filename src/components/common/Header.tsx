"use client"
import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";

import { Menu } from "../../stories/Menu/Menu";
import { Button } from "../../stories/Button/Button";

import pathList from "../../json/menuPathList.json";
import menuList from "../../json/menuInfoList.json";

import Logo from "../../assets/images/logo.png";

export default function Header() {
	const session = useSession();
	const signInAction = () => {
		signIn();
	}
	const signOutAction = () => {
		signOut();
	}
	return (
		<div className="flex items-center justify-between shadow-lg p-6 pb-4 ">
			<div className="left-box flex items-center">
				<div className="logo-box">
					<Image
						src={Logo}
						className="rounded-lg"
						width={40}
						height={40}
						alt="health image"
						style={{ width: "auto", objectFit: "cover" }}
					/>	
				</div>
				<div className="links pl-4">
					{pathList.map((item) => (
						<Link
							key={item.pathId}
							href={item.path}
							className="inline-block mr-2 p-2 leading-none rounded-lg transition-colors link"
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
			<div className="flex">
				{ session.status === "authenticated" && 
					<Button label="ログアウト" size="small" className="mr-2 h-[32px]" onClick={() => { signOutAction(); }} /> }
				{ session.status === "authenticated" ? 
				<Menu pathList={menuList} size="large" /> :
				<Button label="ログイン" onClick={() => { signInAction(); }} /> }
			 </div>
		</div>
	);
}