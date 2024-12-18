import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../stories/Button/Button";
import { Title3h } from "../stories/Title3h/Title3h";
import { useRouter } from "next/navigation";

export default function SectionMakeCycle() {
	const router = useRouter();

	const goPlanAction = () => {
		router.push("/planFeedback");
	};
	
	return (
		<section className="section-make-cycle">
			<Title3h title="サイクル構造を作成する" size="large" />
		  <div className="login-box flex justify-center">
				<div className="text-box pl-4">
					<p className="pb-2 text-5xl">情報のテキスト化をしてみる。</p>
				</div>
			</div>
		</section>
	);
}
