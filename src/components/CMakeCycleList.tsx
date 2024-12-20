"use client";
import { useState ,useMemo, useEffect } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import { Cycle, CycleColumn } from "../type/cycle";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import CMakeCycleItem from "./CMakeCycleItem";
import { useStoreCycle } from "../store/cycle";

import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

type Props = {
	columns: CycleColumn[];
	cycles: Cycle[];
};

export default function CMakeCycleList(props: Props) {
	const { cycleColumns, cycles } = useStoreCycle();
	const { setNodeRef } = useDroppable({ id: 0 });
	const [frameBoxList, frameBoxListSet] = useState([{frameName: "list1"},{frameName: "list2"}]);
	const [cycleKanbanItem, cycleKanbanItemSet] = useState(cycleColumns);

	// useEffect(() => {
	// 	cycleKanbanItemSet(cycleColumns);
	// }, [cycleColumns]);

	const cycleKanbanList = useMemo(() => {
		const reColumns: CycleColumn[] = [];
		cycleColumns.forEach((column,index) => {
			reColumns.push(column);
			cycles.forEach((cycle) => {
				if(column.cycleColumnId === cycle.groupId) {
					const list:Cycle[] = [];
					console.log(cycle);
					list.push(cycle);
					reColumns[index].cards = list;
				}
			});
		})
		return reColumns;
	},[cycleColumns,cycles]);

	const handleDragOver = (event: DragOverEvent) => {
		console.log("handleDragOver");
		console.log(event);
	}

	const handleDragEnd = (event: DragEndEvent) => {
		console.log("handleDragEnd");
		console.log(event);
		console.log(event.active.data.current?.sortable.containerId);
	}

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

	return (
		<div className="pb-4">
			<div className="title-line-box pb-8">
				<Titleline3h title="フレームワークのリスト" size="small" />
			</div>
			<div className="flex cycle-list">
				<DndContext
					sensors={sensors}
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
					onDragOver={handleDragOver}
				>
					{cycleKanbanList.map((item) => 
						<div key={item.cycleColumnId} className="cycle-item w-[33.333%] border rounded-lg mx-4">
							<SortableContext id={item.cycleColumnId} items={item.cards} strategy={rectSortingStrategy}>
								<div ref={setNodeRef}>
									{item.cards.map((cycle) => (
										<CMakeCycleItem
											key={`CMakeCycleItem${cycle.id}`}
											item={cycle}
										/>
									))}
								</div>
							</SortableContext>
						</div>
					)}
				</DndContext>
			</div>
		</div>
	);
}
