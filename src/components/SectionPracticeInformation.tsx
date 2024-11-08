"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { InputRange } from "../stories/InputRange/InputRange";
import { Select } from "../stories/Select/Select";

import SelectSportsPracticeInfoList from "../json/selectSportsPracticeInfoList.json";

export default function SectionPracticeInformation() {
	const [experiencePoints, experiencePointsSet] = useState(0);
	const [cuurentSportId, cuurentSportIdSet] = useState("ballSports");
	const selectSportsPracticeInfoList = SelectSportsPracticeInfoList;
	const router = useRouter();

	const selectList = useMemo(() => {
		return selectSportsPracticeInfoList.map((item) => {
			return { value: item.categoryId, label: item.categoryName };
		});
	}, [selectSportsPracticeInfoList]);

	const goPlanAction = () => {
		router.push("/planFeedback");
	};

	return (
		<section className="section-level-up">
			<Title3h title="練習量で増加する情報量" size="large" />
			<div className="details">
				<div className="pb-8">
					<p className="text pb-2">練習を継続すると情報が増えます。</p>
					<p className="text pb-2">
						何が言いたいかというと、確認フォームをするとその箇所の情報が増加します。
					</p>
					<p className="text pb-2">情報は練習の意識次第で変化していきます。</p>
					<p className="text pb-2">
						フォームの部位を認識していると情報が蓄積していくので計画するパタンの材料になります。
					</p>
				</div>
				<div className="details-action p-8 pb-4 border rounded-lg max-w-[420px]">
					<div className="action-box pb-4">
						<Select
							id="sportsGrowth"
							onChange={(value) => {
								cuurentSportIdSet(value);
							}}
							options={selectList}
						/>
					</div>
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
				<div className="details-result p-8">
					{selectSportsPracticeInfoList.map((sportsGrowthItem) => (
						<div key={sportsGrowthItem.categoryId} className="">
							{cuurentSportId === sportsGrowthItem.categoryId &&
								sportsGrowthItem.list.map((item) => (
									<div key={item.id}>
										{item.skillLevel < experiencePoints && (
											<div className="pb-2">{item.label}</div>
										)}
									</div>
								))}
						</div>
					))}
				</div>
				<Title3h title="計画の再評価" size="medium" />
				<p className="text pb-2">
					練習量で増えた情報を利用して計画を再評価させていきましょう。
				</p>
				<div className="pb-2">
					<Button
						label="計画の再評価へ移行"
						onClick={() => {
							goPlanAction();
						}}
					/>
				</div>
			</div>
		</section>
	);
}
