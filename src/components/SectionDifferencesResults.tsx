"use client"
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { InputRange } from "../stories/InputRange/InputRange";
import { Select } from "../stories/Select/Select";

import SelectSportsDifferencesResultsList from "../json/selectSportsDifferencesResultsList.json";

export default function SectionDifferencesResults() {
	const [experiencePoints,experiencePointsSet] = useState(0);
	const [cuurentSportId,cuurentSportIdSet] = useState("ballSports");
	const selectSportsDifferencesResultsList = SelectSportsDifferencesResultsList;
	const router = useRouter();

	const selectList = useMemo(() => {
		return selectSportsDifferencesResultsList.map((item) => {
			return { value: item.categoryId, label: item.categoryName }
		});
	},[selectSportsDifferencesResultsList]);

	const goPlanAction = () => {
		router.push("/planFeedback");
	}

	return (
		<section className="section-level-up">
			<Title3h title="調整した差で結果が大きく変化する" size="large" />
			<div className="details">
				<p className="text pb-2">運動の場合にわずかな変化で結果が大きく影響するケースがあります。</p>
				<p className="text pb-2">一部を変化して連動し、結果が大きく変化するなどが挙げられます。</p>
				<p className="text pb-2">わずかな変化とは何があるでしょうか。例としては体幹の使い方や呼吸法などで変化することがあります。</p>
				<p className="text pb-2"></p>
				<div className="details-action p-8 pb-4">
					<div className="action-box pb-2">
						<Select
							id="sportsGrowth"
							onChange={(value) => { cuurentSportIdSet(value) }}
							options={selectList}
						/>
					</div>
					<div className="action-box flex">
						<InputRange
							value={experiencePoints}
							onChange={(value) => { experiencePointsSet(Number(value)) }}
							max={10}
						/>
						経験値 { experiencePoints }
					</div>
				</div>
				<div className="details-result p-4 pb-8">
					{selectSportsDifferencesResultsList.map((sportsGrowthItem) => <div key={sportsGrowthItem.categoryId} className="">
						{ cuurentSportId ===  sportsGrowthItem.categoryId && sportsGrowthItem.list.map((item) => <div key={item.id}>
							{ item.skillLevel < experiencePoints && <div className="pb-2">{item.label}</div>}
						</div>)}
					</div>)}
				</div>
				<Title3h title="計画で意識している厳密な調整" size="medium" />
				<p className="text pb-2">計画と結果に対して、厳密な変化した情報と変化した結果について述べてください。</p>
				<div className="pb-2">
					<Button
						label="計画を見直す"
						onClick={() => { goPlanAction(); }}
					/>
				</div>
			</div>
		</section>
	);
}
