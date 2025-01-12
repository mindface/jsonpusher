"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdSense() {
	const pathName = usePathname();

	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (err) {
			console.error(err);
		}
	}, [pathName]);

	return (
		<div className="ad-sense" key={pathName}>
			<ins
				style={{ display: "block" }}
				className="adsbygoogle"
				data-adtest={process.env.NODE_ENV === "development" ? "on" : "off"}
				data-ad-client="ca-pub-7006357860917162"
				data-ad-slot="8558049857"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		</div>
	);
}
