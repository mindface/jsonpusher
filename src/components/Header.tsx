"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react";

import { Button } from "../stories/Button/Button";
import { Menu } from "../stories/Menu/Menu";

import menuList from "../json/menuInfoList.json";
import pathList from "../json/menuPathList.json";

import Logo from "../assets/images/logo.png";

export default function Header() {
	const session = useSession();
	const router = useRouter();
	const signInAction = () => {
		router.push("/login");
	};
	const signOutAction = () => {
		// なぜ手動で消すことになっているのか
		if (typeof window !== "undefined") {
			localStorage.removeItem("next-auth.session-token");
			sessionStorage.removeItem("next-auth.session-token");
			document.cookie = `next-auth.session-token=; path=/; expires=${new Date(0).toUTCString()}`;
		}
		signOut({
			callbackUrl: "/login",
		});
	};
	return (
		<div className="flex items-center justify-between shadow-lg p-6 pb-4">
			<div className="header-side h-[100vh] group fixed top-0 left-0 bg-white">
				<menu className="side-menu space-y-2 w-[20px] hover:w-[230px] transition-all duration-300 group-hover:max-w-xs">
					<li className="menu-item overflow-hidden">
						{pathList.map((item) => (
							<Link
								key={item.pathId}
								href={item.path}
								className="block mr-2 p-2 leading-none rounded-lg text-gray-700 whitespace-nowrap"
							>
								<span className="icon inline-block pr-2">X</span>
								<span className="inline-block text-sm font-medium">
									{item.name}
								</span>
							</Link>
						))}
					</li>
				</menu>
			</div>
			<div className="left-box flex items-center pl-12">
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
			</div>
			<div className="flex">
				{session.status === "authenticated" && (
					<Button
						label="ログアウト"
						size="small"
						className="mr-2 h-[32px]"
						onClick={() => {
							signOutAction();
						}}
					/>
				)}
				{session.status === "authenticated" ? (
					<Menu pathList={menuList} size="large" />
				) : (
					<Button
						label="ログイン"
						onClick={() => {
							signInAction();
						}}
					/>
				)}
			</div>
		</div>
	);
}
