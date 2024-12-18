import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
// import { useRouter } from "next/navigation";

export default function SectionMakeCycle() {
	// const router = useRouter();

	// const goPlanAction = () => {
	// 	router.push("/planFeedback");
	// };
	
	return (
		<section className="section-make-cycle">
			<Titleline3h title="サイクル構造を作成する" size="large" />
		  <div className="login-box flex justify-center">
				<div className="text-box pl-4">
					<p className="pb-2 text-5xl">情報のテキスト化をしてみる。</p>
				</div>
			</div>
		</section>
	);
}
