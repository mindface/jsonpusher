"use client";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
	const path = usePathname();

	const paths = useMemo(() => {
		const pathArray = path?.split("/");
		pathArray?.shift();
		return pathArray;
	}, [path]);

	return (
		<div className="p-4 pl-16 flex justify-start">
			{path !== "/" && (
				<>
					<Link
						href="/"
						className="inline-block mr-2 p-2 leading-none rounded-lg transition-colors link"
					>
						home
					</Link>
					&gt;
				</>
			)}
			{paths?.map((item, index) => (
				<span key={`breadcrumb${index}`} className="inline-block pl-2">
					<Link href={`/${item}`}>{item}</Link>
					{index !== paths.length - 1 && ` >`}
				</span>
			))}
		</div>
	);
}
