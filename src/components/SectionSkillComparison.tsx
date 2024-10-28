"use client"
import { useState, useMemo } from "react";
import { Title3h } from "../stories/title3h/Title3h";
import { InputRange } from "../stories/InputRange/InputRange";
import { Select } from "../stories/Select/Select";

import SelectSkillComparisonList from "../json/selectSkillComparisonList.json";

export default function SectionSkillComparison() {
	const [experiencePoints,experiencePointsSet] = useState(0);
	const [cuurentSkillId,cuurentSkillIdSet] = useState("ballSports");
	const selectSportsGrowthList = SelectSkillComparisonList;

	const selectList = useMemo(() => {
		return selectSportsGrowthList.map((item) => {
			return { value: item.categoryId, label: item.categoryName }
		});
	},[selectSportsGrowthList]);

	return (
		<section className="section-skill-comparison">
			<Title3h title="スキルを比較する" size="large" />
			<div className="details">
				<p className="text pb-2">向上を目指す時に過去の記録と現状の状態を比較します。</p>
				<p className="text pb-2">単純に練習して向上できなければ、質問する情報量が変化します。</p>
				<div className="details-action p-8 pb-4">
					<div className="action-box">
						<Select
							id="sportsGrowth"
							onChange={(value) => { cuurentSkillIdSet(value) }}
							options={selectList}
						/>
					</div>
					<div className="action-box flex">
						<InputRange
							value={experiencePoints}
							onChange={(value) => { experiencePointsSet(Number(value)) }}
							max={10}
						/>
						経験レベル{ experiencePoints }
					</div>
				</div>
				<div className="details-result p-8 pt-2">
					{selectSportsGrowthList.map((sportsGrowthItem) => <div key={sportsGrowthItem.categoryId} className="">
						{ cuurentSkillId === sportsGrowthItem.categoryId && sportsGrowthItem.list.map((item) => <div key={item.id}>
							{ item.skillLevel < experiencePoints && <div className="pb-2">{item.label}</div>}
						</div>)}
					</div>)}
				</div>
				<p className="text pb-2">増える質問はあくまで順不同なのでタイミングや増加の仕方は個人で異なります。</p>
				<p className="text pb-2">評価した技術を比較することになります。</p>
				<p className="text pb-10">結果とベースとなる構造をもとに計画した練習01と計画した練習02を比較して、結果の良い方を選択することになります。この「良い方」とは目的の近い結果を再現性のある方になります。</p>
				<Title3h title="比較内容について" size="small" />
				<div className="flex pb-12">
					<div className="p-4 pr-8">
						<h4 className="title pb-4">過去の情報</h4>
						<p>これまでのプロセス</p>
						<p>基準にしている評価</p>
						<p>記憶からイメージできる改善方法</p>
						<p>分析手法と練習パタンを確立</p>
					</div>
					<div className="p-4">
						<h4 className="title pb-4">現状の情報</h4>
						<p>目的からの調整で変更したプロセス</p>
						<p>練習などで増やした評価</p>
						<p>練習した記憶から注意してイメージできる方法の増加</p>
						<p>練習から分析した練習パタンの変化</p>
					</div>
				</div>
				<p className="text pb-2">比較して情報へ関与していきます。</p>
				<p className="text pb-2">健康でも情報を比較して、フィードバック構造を考えていくので参考にしてみてください。</p>
			</div>
		</section>
	);
}
