"use client"
import { useState } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { Textarea } from "../stories/TextArea/Textarea";
import { Button } from "../stories/Button/Button";
import { useStoreNextPlan } from "../store/planNext";

export default function SectionGrowthQuantification() {
	const { nextPlans } = useStoreNextPlan();
	const [textGrowth,textGrowthSet] = useState("");

	const copyJsonAciton = () => {
		let copyText = "";
		copyText += "--------------\n"
		nextPlans.forEach((plan) => {
			copyText += `${plan.title} \n`
		});
		copyText += "--------------\n"
		copyText += textGrowth;
		copyText += "計画に対して成長の過程を評価してください。";
		navigator.clipboard
			.writeText(copyText)
			.then(() => {
				alert("コピーしました。");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	}

	return (
		<section className="section-skill-comparison">
			<Title3h title="成長の定義を決める" size="large" />
			<div className="details w-[460px] sm:w-[640px] pb-8">
				<p className="text pb-2">成長することがシュートを決める確率を上げることだったり、フォームの変更からヒットを打つことだったりします。</p>
				<p className="text pb-2">結果に対して、フィードバックしていく範囲を決めることになります。</p>
				<p className="text pb-2">成長するまでのストーリーを自分で描くことで設計していきます。</p>
				<p className="text pb-2">計画した内容で実現可能かを評価します。計画と成長が可能かを検討することになります。</p>
			</div>
			<div className="flex">
				<div className="w-[460px] sm:w-[580px] p-2">
					<Title3h title="次の計画" size="small" />
					{nextPlans.map((plan) => <p className="pb-2">{plan.title}</p>)}
				</div>
				<div className="p-2">
					<Textarea
						label="成長するための定量化する評価について"
						value={textGrowth}
						placeholder="練習の評価を文字にしていくことの幅が狭いので、いろいろな意識して変更する方法が知りたい。"
						onChange={(value) => { textGrowthSet(value) }}
					/>
				</div>
			</div>
			<div className="pt-4 pb-2">
				<Button
					label="評価を質問する形式でコピーする"
					onClick={() => { copyJsonAciton(); }}
				/>
			</div>
		</section>
	);
}
