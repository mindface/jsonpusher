"use client"
import { useState ,useMemo, useEffect } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import CMakeCycleIEdit from "./CMakeCycleIEdit";
import CMakeCycleList from "./CMakeCycleList";

import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";

import { useStoreCycle } from "../store/cycle";

// ToDo 今後firebaseと連携してく際にコンポーネントを分ける
export default function SectionMakeCycle() {
	const { cycles, cycleColumns, addCycleColumns } = useStoreCycle();
	const [columnTitle, columnTitleSet] = useState("");
	const [columnDetail, columnDetailSet] = useState("");

	const addFrameBoxAction = () => {
		addCycleColumns(columnTitle,columnDetail);
	}

	return (
		<section className="section-make-cycle">
			<Titleline3h title="サイクル構造を作成する" size="large" />
			<div className="section-make">
				<div className="pb-4">
					<Input
						type="text"
						label="フレームワーク全体のタイトル"
						value={columnTitle}
						onChange={(value) => { columnTitleSet(value as string) }}
					/>
				</div>
				<div className="pb-4">
					<Input
						type="text"
						label="フレームワーク全体の詳細"
						value={columnDetail}
						onChange={(value) => { columnDetailSet(value as string) }}
					/>
				</div>
				<div className="pb-4">
					<Button label="構成の追加" onClick={addFrameBoxAction} />
				</div>
			</div>
		  <div className="make-cycle-box">
				<div className="add-card-box">
					<CMakeCycleIEdit type="add" />
					<CMakeCycleList columns={cycleColumns} cycles={cycles}  />
				</div>
			</div>
		</section>
	);
}
