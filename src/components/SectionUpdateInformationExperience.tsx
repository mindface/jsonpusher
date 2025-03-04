"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "../stories/Button/Button";
import { InputRange } from "../stories/InputRange/InputRange";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import SelectUpdateInformationExperience from "../json/selectUpdateInformationExperience.json";

import UpdateInformationExperienceImages from "./parts/UpdateInformationExperienceImages";

export default function SectionUpdateInformationExperience() {
	const [experiencePoints, experiencePointsSet] = useState(0);
	const selectUpdateInformationExperience = SelectUpdateInformationExperience;
	const router = useRouter();

	const selectUpdateInformationExperienceList = useMemo(() => {
		return selectUpdateInformationExperience.list.map((item) => {
			return {
				value: item.id,
				label: item.label,
				skillLevel: item.skillLevel,
				imageId: item.imageId,
			};
		});
	}, [selectUpdateInformationExperience]);

	const goPlanAction = () => {
		router.push("/evaluate/planFeedback");
	};

	return (
		<section className="section-level-up">
			<Titleline3h title="経験と情報の更新" size="large" />
			<div className="details">
				<p className="text pb-2">経験が増えると使えるデータがあります。</p>
				<p className="text pb-2">
					記憶の増加によって、使えるフォームやプレーのパタンが変化します。
				</p>
				<p className="text pb-8">
					どのパタンが使えるかを評価することになります。問題はどの組み合わせで使うかでしょうか。
				</p>
				<div className="details-action p-4 border rounded-lg max-w-[420px]">
					<p className="pb-2">野球のケース</p>
					<div className="action-box flex">
						<InputRange
							value={experiencePoints}
							onChange={(value) => {
								experiencePointsSet(Number(value));
							}}
							max={10}
						/>
						経験値 {experiencePoints}
					</div>
				</div>
				<div className="flex flex-wrap gap-10 details-result pt-8 pb-8">
					{selectUpdateInformationExperienceList.map((updateItem) => (
						<div key={`updateItem0${updateItem.skillLevel}`} className="">
							{updateItem.skillLevel < experiencePoints && (
								<div className="border rounded-lg p-2">
									<UpdateInformationExperienceImages
										imageId={updateItem.imageId}
									/>
									<p className="p-2">{updateItem.label}</p>
								</div>
							)}
						</div>
					))}
				</div>
				<Titleline3h title="経験が変化して調整する情報設計" />
				<div className="mb-8 p-4 border rounded-lg max-w-[640px]">
					<p className="text pb-2">
						経験が増えて、過去のイメージを使い改善させることがあるでしょう。
					</p>
					<p className="text pb-2">
						手首や内ももの使い方など細かい点から
						「バットの位置をどこに保持しておくか」 なども考えられます。
					</p>
					<p className="text">
						経験の中から情報を選んで、変化する項目に加えるポイントについて考えてみましょう。
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
