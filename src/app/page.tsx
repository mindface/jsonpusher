import Image from "next/image";
import mainImage from "../assets/images/main-image.jpg";

export default function Home() {
	return (
		<div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex row-start-2 items-center justify-center sm:items-start">
				<div className="main-image-box">
					<Image
						className="dark:invert rounded-lg"
						src={mainImage}
						alt="main image"
						width={400}
						height={400}
						priority
					/>
					<p className="pt-2 pb-2 text-center">質問するテキストをカテゴリから選んでみよう</p>
				</div>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
			</footer>
		</div>
	);
}
