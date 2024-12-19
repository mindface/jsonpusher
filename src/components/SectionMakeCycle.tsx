"use client"
import { useState } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";

import CMakeCycleIEdit from "./CMakeCycleIEdit";
import CMakeCycleList from "./CMakeCycleList";

import { Cycle } from "../type/cycle";

import { useStoreCycle } from "../store/cycle";

// ToDo 今後firebaseと連携してく際にコンポーネントを分ける
export default function SectionMakeCycle() {
	const { cycles } = useStoreCycle();
	const [cycleCardItem, cycleCardItemSet] = useState<Cycle[]>([]);

	const [cycleCardItemTitle, cycleCardItemTitleSet] = useState("");
	const [cycleCardItemDetail, cycleCardItemDetailSet] = useState("");

	const addCycleCardItemAction = () => {
		const setItem = {
			id: cycleCardItemTitle.length+1,
			title: cycleCardItemTitle,
			detail: cycleCardItemDetail,
			connectId: "0",
			userId: "0"
		}
		cycleCardItemSet([...cycleCardItem,setItem]);
	}
	const editCycleCardItemAction = () => {}
	const deleteCycleCardItemAction = () => {}

	return (
		<section className="section-make-cycle">
			<Titleline3h title="サイクル構造を作成する" size="large" />
		  <div className="login-box">
				<div className="add-card-box">
					<CMakeCycleIEdit type="add" />
					<CMakeCycleList items={cycles} />
				</div>
			</div>
		</section>
	);
}
