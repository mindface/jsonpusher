import Image from "next/image";
import type { Metadata } from "next/types";
import mainImage from "../assets/images/main-image.jpg";

export const metadata: Metadata = {
	title: "Create Question Text App",
	description: "Generated by create text app",
	other: {
		"google-site-verification": "nx62BK3IdQkLHDjIQW1L-u_uVYvoUYWGigVtgnM7rtA",
	},
};

export default function Home() {
	return (
		<div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex row-start-2 items-center justify-center sm:items-start">
				<div className="main-image-box">
					<div className="text-center">
						<Image
							className="dark:invert rounded-lg m-auto"
							src={mainImage}
							alt="main image"
							width={400}
							height={400}
							priority
						/>
					</div>
					<p className="pt-2 pb-2 text-center">
						質問するテキストを生成するツールです。
					</p>
					<p className="pt-2 pb-2 text-center">
						量が多くなると調整が必要なため、質問内容も徐々に考えていけるようにしましょう。
					</p>
				</div>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center" />
		</div>
	);
}
