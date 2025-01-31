import { CLink } from "../stories/CLink/CLink";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

export default function SectionMakeCycle() {
	return (
		<section className="section-make-cycle pl-8">
			<Titleline3h title="サイクル構造を発生させるモデルを作成" size="large" />
			<div className="make-cycle-box">
				<div className="p-4">
					<p className="pb-4">自分で参考モデルに関して作成してみましょう。</p>
					<p className="pb-4">
						・OODAループ：O(観察)、O(方針)、D(意思決定)、A(行動)
					</p>
					<p className="pb-8">
						{" "}
						観察(動画・画像)
						<br />
						方針(実装効果について)
						<br />
						意思決定(試合での決定)
						<br />
						行動(プレー)
					</p>
					<p className="pb-4">
						・STPDサイクル：See（見る）、Think（考える）、Plan（計画）、Do（実行）
					</p>
					<p className="pb-8">
						{" "}
						See(動画・画像)
						<br />
						Think(練習効果について無意識に設計)
						<br />
						Plan(練習の計画)
						<br />
						Do(練習orプレー)
					</p>
					<p className="pb-4">
						・PDRサイクル：Prep（準備）、Do（実行）、Review（評価）
					</p>
					<p className="pb-4">
						{" "}
						Prep(これまでの練習の動画・画像を分析)
						<br />
						Do(練習設計)
						<br />
						Review(プレーから練習の評価を見直す)
					</p>
					<p className="pb-4">
						※自分の評価を見直すために評価についても考えてみてください。
					</p>
				</div>
				<CLink type="button" label="AIで質問する" href="/useGemini" />
			</div>
		</section>
	);
}
