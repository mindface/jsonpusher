"use client";
import { useMemo } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
	MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";

import CMakeCycleItem from "./CMakeCycleItem";
import { useStoreCycle } from "../store/cycle";

import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export default function CMakeCycleList() {
	const { cycles ,setCycleColumns, cycleColumns, setCycle  } = useStoreCycle();
	const { setNodeRef } = useDroppable({ id: 0 });

	const list = useMemo(() => {
		return cycles;
	},[cycles]);

	// 使うタイミングあるか確認中
	const handleDragOver = () => {}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if(over === null) {
			return;
		}
		if (active.id !== over.id) {
				const oldIndex = list.findIndex(
					(item) => item.id === active.id
				);
				const newIndex = list.findIndex(
					(item) => item.id === over.id
				);
				const newItems =  arrayMove(list, oldIndex, newIndex);
				setCycle(newItems);
		}
		return
		// Todo カテゴリで複数のDndContextで利用しているが調整中 別のライブラリも検討中
		const activeId = Number(active.id);
		const overId = Number(over?.id);
		const targetId = event.active.data.current?.sortable.containerId;
		const reCycleKanbanList = cycleColumns.map((item) => {
			if(item.cycleColumnId === targetId) {
				let moveAactiveId = 0;
				let moveOverId = 0;
				item.cards.forEach((card,index) => {
					if(card.id === activeId) moveAactiveId = index;
					if(card.id === overId) moveOverId = index;
				});
				const element = item.cards.splice(moveAactiveId,1)[0];
				item.cards.splice(moveOverId,0,element);
			}
			return item;
		});
		setCycleColumns(reCycleKanbanList);
	}

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(
		mouseSensor,
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
			<div className="flex cycle-list w-[100%]">
				<DndContext
				  sensors={sensors}
					onDragEnd={handleDragEnd}
					onDragOver={handleDragOver}
				>
					<div className="cycle-item border rounded-lg mx-4 w-[100%]">
						<SortableContext items={list} strategy={rectSortingStrategy}>
							<div ref={setNodeRef}>
								{list.map((cycle) => (
									<CMakeCycleItem
										key={`CMakeCycleItem${cycle.id}`}
										item={cycle}
									/>
								))}
							</div>
						</SortableContext>
					</div>
				</DndContext>
			</div>
		</div>
	);
}