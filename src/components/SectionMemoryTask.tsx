"use client";
import { useEffect } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import { Dialog } from "../stories/Dialog/Dialog";

import CMemoryTaskEdit from "./parts/CMemoryTaskEdit";
import CMemoryTaskList from "./parts/CMemoryTaskList";

import { useStoreMemory } from "../features/memory/store/memoryStore";

export default function SectionMemoryTask() {
	const { memories, getMemory } = useStoreMemory();
	useEffect(() => {
		getMemory();
	}, [getMemory]);

	return (
		<section className="section-memory-task">
			<Titleline3h title="記録をするための情報を考える" size="large" />
			<div className="memory-task-box">
				<Dialog label="記録を追加する" type="button">
					<CMemoryTaskEdit type="add" />
				</Dialog>
				<CMemoryTaskList items={memories} />
			</div>
		</section>
	);
}
