import { useEffect } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import CMemoryTaskEdit from "./CMemoryTaskEdit";
import CMemoryTaskList from "./CMemoryTaskList";

import { useStoreMemoery } from "../store/memory";

export default function SectionMemoryTask() {
	const { memories, getMemory } = useStoreMemoery();
	useEffect(() => {
		getMemory();
	},[]);

	return (
		<section className="section-memory-task">
			<Titleline3h title="記録をするための情報を考える" size="large" />
			<div className="memory-task-box">
				<CMemoryTaskEdit type="add" />
				<CMemoryTaskList items={memories} />
			</div>
		</section>
	);
}
