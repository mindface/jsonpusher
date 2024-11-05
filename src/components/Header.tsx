import Link from "next/link";
import { Menu } from "../stories/Menu/Menu";

const pathList = [
	{
		pathId: 1,
		path: "/",
		name: "ホーム",
	},
	{
		pathId: 2,
		path: "/health",
		name: "健康",
	},
	{
		pathId: 3,
		path: "/sports",
		name: "スポーツ",
	},
];

const menuList = [
	{
		pathId: "menu01",
		path: "/",
		name: "ホーム",
	},
	{
		pathId: "menu02",
		path: "/levelUpPattern",
		name: "レベルアップのパターン",
	},
	{
		pathId: "menu03",
		path: "/levelSkillComparison",
		name: "スキルを比較するということ",
	},
	{
		pathId: "menu04",
		path: "/planFeedback",
		name: "練習を計画すること",
	},
	{
		pathId: "menu05",
		path: "/nextPlanEvaluation",
		name: "計画の評価を文字にする",
	},
	{
		pathId: "menu06",
		path: "/growthQuantification",
		name: "成長を定量化する",
	},
	{
		pathId: "menu07",
		path: "/practiceInformation",
		name: "練習と情報量の変化について",
	},
	{
		pathId: "menu08",
		path: "/differencesResults",
		name: "微妙な差と結果からのフィードバックについて",
	},
	{
		pathId: "menu09",
		path: "/useAdvice",
		name: "アドバイスを使うことと評価",
	},
	{
		pathId: "menu10",
		path: "/updateInformationExperience",
		name: "経験から情報を更新",
	}
];

export default function Header() {
	return (
		<div className="flex items-center justify-between shadow-lg p-6 pb-4 ">
			<div className="links">
				{pathList.map((item) => (
					<Link
            key={item.pathId}
            href={item.path}
            className="inline-block mr-2 p-2 leading-none rounded-lg transition-colors link"
          >
						{item.name}
					</Link>
				))}
			</div>
      <Menu pathList={menuList} size="large" />
		</div>
	);
}
