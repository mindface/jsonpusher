"use client"
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { InputRange } from "../stories/InputRange/InputRange";

import SelectUpdateInformationExperience from "../json/selectUpdateInformationExperience.json";

import UpdateInformationExperienceImages from "./parts/UpdateInformationExperienceImages";

export default function SectionUpdateInformationExperience() {
	const [experiencePoints,experiencePointsSet] = useState(0);
	const selectUpdateInformationExperience = SelectUpdateInformationExperience;
	const router = useRouter();

	const selectUpdateInformationExperienceList = useMemo(() => {
		return selectUpdateInformationExperience.list.map((item) => {
			return { value: item.id, label: item.label, skillLevel: item.skillLevel, imageId: item.imageId  }
		});
	},[selectUpdateInformationExperience]);

	const goPlanAction = () => {
		router.push("/planFeedback");
	}

	return (
		<section className="section-level-up">
			<Title3h title="経験と情報の更新" size="large" />
			<div className="details">
				<p className="text pb-2">経験が増えると使えるデータがあります。</p>
				<p className="text pb-2">記憶の増加によって、使えるフォームやプレーのパタンが変化します。</p>
				<p className="text pb-4">どのパタンが使えるかを評価することになります。問題はこの評価でどんな記録の仕方でしょうか。</p>
				<div className="details-action p-8 pb-4">
					<Title3h title="野球のケース" size="medium" />
					<div className="action-box flex">
						<InputRange
							value={experiencePoints}
							onChange={(value) => { experiencePointsSet(Number(value)) }}
							max={10}
						/>
						経験値 { experiencePoints }
					</div>
				</div>
				<div className="flex flex-wrap gap-10 details-result p-4 pb-8">
					{selectUpdateInformationExperienceList.map((updateItem) => <div key={`updateItem0${updateItem.skillLevel}`} className="">
						{ updateItem.skillLevel < experiencePoints && <div className="border rounded-lg p-2">
							<UpdateInformationExperienceImages imageId={updateItem.imageId} />
							<p className="p-2">{updateItem.label}</p>
						</div>}
					</div>)}
				</div>
				<div className="p-4 border rounded-lg">
					<Title3h title="経験が変化して調整する情報設計" size="medium" />
					<p className="text pb-4">経験が増えて、過去のイメージを使うために選択することがあるでしょうか。</p>
					<p className="text pb-4">経験の中から情報を選んで、変化する項目に加えるか考えてみましょう。</p>
					<div className="pb-2">
						<Button
							label="計画を見直す"
							onClick={() => { goPlanAction(); }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
