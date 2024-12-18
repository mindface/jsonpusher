import { Title3h } from "../stories/Title3h/Title3h";
import { CLink } from "../stories/CLink/CLink";

export default function SectionSportsAndJob() {
	return (
		<section className="section-health">
			<Title3h title="スポーツと働くことの接点" size="large" />
			<div className="p-4 mb-4 border rounded-lg">
				<p className="pb-4">「スポーツは将来役に立つ」という内容を言語化しています。</p>
				<p className="pb-4">自分の努力がパフォーマンスに影響を再現可能で安定させるにはどうするかも、前提にしてみてください。</p>
				<p className="pb-4">身体の状況が変化すると設計プロセスも変化していきます。調整方法も考えてみてください。</p>
			</div>
			<div className="p-4 mb-4 border rounded-lg">
				<Title3h title="改善のサイクル化" />
				<p className="pb-4">改善方法について考えることは多いでしょう。何が課題となるでしょうか。</p>
				<p className="pb-4">PDCAサイクルはよく聞きますが、スポーツでもミクロに[計画][実行][検証][改善]のサイクルを利用します。</p>
				<p className="pb-4">練習中頭の中でうまくいかなかった点を修正して、別のフォームに改善して再度実行することはあるでしょう。</p>
				<p className="pb-4">この実行プロセスを自分の仕事で、計画、実行、検証、改善、に当てはめて最適化していきます。</p>
				<p className="pb-4">これは例です。PPCCDAやPCDAAなど自分でアレンジしている人もいるでしょう。</p>
				<p className="pb-4">別の例もあります。</p>
				<p className="pb-4">・OODAループ：観察、方針、意思決定、行動</p>
				<p className="pb-4">・STPDサイクル：See（見る）、Think（考える）、Plan（計画）、Do（実行）</p>
				<p className="pb-4">・PDRサイクル：Prep（準備）、Do（実行）、Review（評価）</p>
				<p className="pb-4">これらは例で自分でOOPDAなどのように自分で作り上げていくことが必要です。</p>
				<p className="pb-4">働くときも同様です。そのフレームワークに関して考えてみましょう。</p>
			</div>
			<div className="p-4 mb-4 border rounded-lg">
				<Title3h title="問題を細分化" />
				<p className="pb-4">これらの方法で解決できないときにする問題を細分化します。</p>
				<p className="pb-4">前提など含めて問題を解決できなければ、自分で解決する単位に落とし込みます。</p>
				<p className="pb-4">ボールを投げる時、肩と腕、指先など注意してフォームを意識して結果が変化したか考えます。</p>
			</div>
			<div className="p-4 mb-4 border rounded-lg">
				<Title3h title="シンプルに捉えるタイミング" />
				<p className="pb-4">問題を細分化して、解決できない場合にはシンプルな解決方法へ意識を変化させます。</p>
				<p className="pb-4">部分的な手段をシンプルにして、全体を調整することが目的です。</p>
				<p className="pb-4">細かく管理しすぎて、全体のバランスが悪くなるケースがあります。</p>
				<p className="pb-4">シンプルにしていくことで、全体から目的へ調整しやすくします。</p>
			</div>
			<div className="p-4">
				<CLink
					type="button"
					label="方法を作成する"
					href="/sportAndJob/makeCycle"
				/>
			</div>			
		</section>
	);
}
