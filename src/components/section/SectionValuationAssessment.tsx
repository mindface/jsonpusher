import { useRouter } from "next/navigation";
import { Button } from "../../stories/Button/Button";
import { Titleline3h } from "../../stories/Titleline3h/Titleline3h";

export default function SectionValuationAssessment() {
	const router = useRouter();

	const goPlanAction = () => {
		router.push("/evaluate/planFeedback");
	};

	return (
		<section className="section-level-up">
			<Titleline3h title="評価に関してどう変化させるか。" />
			<div className="details">
				<p className="text pb-2">
					評価について色々な方法が存在しています。以下が例になります。
				</p>
				<div className="case-box pb-2">
					<ul className="list border rounded-lg p-4">
						<li className="item">
							<p className="pb-4 font-bold">・数値化された評価指標</p>
							<p className="pb-2">
								スコアやグラフで記録することを検討する。例として、動作のスムーズさ、強度の向上、持続時間などを定期的に測定する。
							</p>
						</li>
						<li className="item">
							<p className="pb-4 font-bold">・ビデオ記録</p>
							<p className="pb-2">
								パフォーマンスを撮影し、動作の改善点や姿勢の変化を目視で比較する。特に身体のシンメトリーや動きの滑らかさに注目する。
							</p>
						</li>
						<li className="item">
							<p className="pb-4 font-bold">・スコアシート作成</p>
							<p className="pb-2">
								重要な評価基準をリストアップして、それぞれに自己評価やコーチからのフィードバックを記載するようなシートを作成する。
							</p>
						</li>
						<li className="item">
							<p className="pb-4 font-bold">・主観的な情報の記録</p>
							<p className="pb-2">
								食事や疲れなどについて、定量化ができなければ主観的なテキストで記録する。
							</p>
						</li>
					</ul>
				</div>
				<div className="details-result p-4 pb-8" />
				<Titleline3h title="選択した評価に関して情報を評価すること" />
				<div className="mb-8 p-4 border rounded-lg max-w-[640px]">
					<p className="text pb-4">
						最初は、とりあえず「本に記述していた」ことや「著名な人が言っている」から、という基準かもしれませんが、徐々に自分で試したことから変更していきましょう。
					</p>
				</div>
				<div className="pb-2">
					<Button
						label="計画を見直す"
						onClick={() => {
							goPlanAction();
						}}
					/>
				</div>
			</div>
		</section>
	);
}
