import Image from "next/image";

import FooterLogo from "../../assets/images/footer_logo.png";

export default function Footer() {
	return (
		<footer className="p-6 pb-4 ">
			<div className="left-box flex">
				<div className="logo-box flex items-center justify-center min-h-screen w-full">
					<div className="bg-white">
						<Image
							src={FooterLogo}
							className="rounded-lg"
							width={340}
							height={340}
							alt="health image"
							style={{ width: "auto", objectFit: "cover" }}
						/>
					</div>
				</div>
			</div>
			<div className="text-center">
				<small>&copy; meliru</small>
			</div>
		</footer>
	);
}
