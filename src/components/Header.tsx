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
		path: "/levelUpPattern",
		name: "練習を計画すること",
	},
];

export default function Header() {
	return (
		<div className="flex justify-between p-6 pb-4">
			<div className="links">
				{pathList.map((item) => (
					<Link key={item.pathId} href={item.path} className="p-1">
						{item.name}
					</Link>
				))}
			</div>
      <Menu pathList={menuList} size="large" />
		</div>
	);
}
