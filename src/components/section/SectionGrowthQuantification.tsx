"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStoreNextPlan } from "../../features/planNext/store/planNextStore";
import { Button } from "../../stories/Button/Button";
import { Textarea } from "../../stories/TextArea/Textarea";
import { Titleline3h } from "../../stories/Titleline3h/Titleline3h";

import { copyClipbord } from "../../utils/copyClipbord";

export default function SectionGrowthQuantification() {
	const { nextPlans, getNextPlans } = useStoreNextPlan();
	const [textGrowth, textGrowthSet] = useState("");
	const router = useRouter();

	const copyJsonAciton = () => {
		let copyText = "";
		copyText += "--------------\n";
		for (const plan of nextPlans) {
			copyText += `${plan.title} \n`;
		}
		copyText += "--------------\n";
		copyText += textGrowth;
		copyText += "計画に対して成長の過程を評価してください。";
		copyClipbord(copyText);
	};

	const goPlanAction = () => {
		router.push("/evaluate/planFeedback");
	};

	useEffect(() => {
		getNextPlans();
	}, [getNextPlans]);

	return (
		<section className="section-skill-comparison">
			<Titleline3h title="成長の定義を決める" size="large" />
			<div className="details w-[460px] sm:w-[640px] mb-8 p-4 border rounded-lg">
				<p className="text pb-2">
					成長することがシュートを決める確率を上げることだったり、フォームの変更からヒットを打つことだったりします。
				</p>
				<p className="text pb-2">
					結果に対して、フィードバックしていく範囲を決めることになります。
				</p>
				<p className="text pb-2">
					成長するまでのストーリーを自分で描くことで設計していきます。
				</p>
				<p className="text pb-2">
					計画した内容で実現可能かを評価します。計画と成長が可能かを検討することになります。
				</p>
			</div>
			<div className="flex">
				<div className="w-[460px] sm:w-[580px] p-2">
					<div className="pb-4">
						<Titleline3h title="次の計画" size="small" />
					</div>
					{nextPlans.map((plan, index) => (
						<p
							key={`growthNextPlans${plan.connectId}-${index}}`}
							className="pb-2"
						>
							{plan.title}
						</p>
					))}
					{nextPlans.length === 0 && (
						<div className="pb-4">
							<Button
								label="次の計画を立てる"
								onClick={() => {
									goPlanAction();
								}}
							/>
						</div>
					)}
				</div>
				<div className="p-2">
					<Textarea
						label="成長への定量化についての評価"
						value={textGrowth}
						placeholder="練習の評価を文字にしていくことの幅が狭いので、いろいろな意識して変更する方法が知りたい。"
						onChange={(value) => {
							textGrowthSet(value);
						}}
					/>
				</div>
			</div>
			<div className="pt-4 pb-2">
				<Button
					label="評価を質問する形式でコピーする"
					onClick={() => {
						copyJsonAciton();
					}}
				/>
			</div>
		</section>
	);
}
