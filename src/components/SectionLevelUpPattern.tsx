"use client"
import { useState, useMemo } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { InputRange } from "../stories/InputRange/InputRange";
import { Select } from "../stories/Select/Select";

import SelectSportsGrowthList from "../json/selectSportsGrowthList.json";

export default function SectionLevelUpPattern() {
	const [experiencePoints,experiencePointsSet] = useState(0);
	const [cuurentSportId,cuurentSportIdSet] = useState("ballSports");
	const selectSportsGrowthList = SelectSportsGrowthList;

	const selectList = useMemo(() => {
		return selectSportsGrowthList.map((item) => {
			return { value: item.categoryId, label: item.categoryName }
		});
	},[selectSportsGrowthList]);

	return (
		<section className="section-level-up">
			<Title3h title="成長していく過程と質問の向上" size="large" />
			<div className="details">
				<p className="text pb-2">経験が浅いと言葉から使える記憶が少ないものです。</p>
				<p className="text pb-2">例えば、以下のレベルを上げると質問の情報は増えます。</p>
				<div className="details-action p-8 pb-4">
					<div className="action-box">
						<Select
							id="sportsGrowth"
							onChange={(value) => { cuurentSportIdSet(value) }}
							options={selectList}
						/>
					</div>
					<div className="action-box flex">
						<InputRange value={experiencePoints} onChange={(value) => { experiencePointsSet(Number(value)) }} />
						{ experiencePoints }
					</div>
				</div>
				<div className="details-result p-8">
					{selectSportsGrowthList.map((sportsGrowthItem) => <div key={sportsGrowthItem.categoryId} className="">
						{ cuurentSportId ===  sportsGrowthItem.categoryId && sportsGrowthItem.list.map((item) => <div key={item.id}>
							{ item.skillLevel < experiencePoints && <div className="pb-2">{item.label}</div>}
						</div>)}
					</div>)}
				</div>
				<p className="text pb-2">プレーの向上に関して、行動の継続で上達しなければ確認事項を増やして効果を検証します。</p>
				<p className="text pb-2">質問の質が向上していくことで定量化していく計画の形成をしていくようにします。</p>
				<p className="text pb-2">現在ではアプリが存在しているのでaiで確認してみてください。</p>
			</div>
		</section>
	);
}
