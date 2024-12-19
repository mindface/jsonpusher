"use client";
import Link from "next/link";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import MenuInfoList from "../json/menuInfoList.json";

export default function SectionEvaluate() {

	return (
		<section className="section-evaluate">
			<Titleline3h title="評価に関係するページの一覧" size="large" />
			<div className="p-8">
				{MenuInfoList.map((menuItem) => <p className="p-4" key={`evaluate-${menuItem.pathId}`}>
					<Link href={`${menuItem.path}`}>
					  <span className="block">{menuItem.name}</span>
						<span className="block">{menuItem.pathId}</span>
					</Link>
				</p>)}
			</div>
		</section>
	);
}
