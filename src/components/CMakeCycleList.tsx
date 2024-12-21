"use client";
import { useState,useEffect } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
	MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import CMakeCycleItem from "./CMakeCycleItem";
import { useStoreCycle } from "../store/cycle";

import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export default function CMakeCycleList() {
	const { setCycleColumns, cycleColumns, settingCycleColumns  } = useStoreCycle();
	const { setNodeRef } = useDroppable({ id: 0 });
	const [stateView,stateViewSet] = useState(true);

	useEffect(() => {
		if(stateView) {
			stateViewSet(false);
			settingCycleColumns();
		}
	}, [stateView,settingCycleColumns]);

	const handleDragOver = (event: DragOverEvent) => {
		console.log("handleDragOver");
		console.log(event);
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		const activeId = Number(active.id);
		const overId = Number(over?.id);
		const targetId = event.active.data.current?.sortable.containerId;
		const reCycleKanbanList = cycleColumns.map((item) => {
			if(item.cycleColumnId === targetId) {
				console.log(targetId);
				let moveAactiveId = 0;
				let moveOverId = 0;
				item.cards.forEach((card,index) => {
					if(card.id === activeId) moveAactiveId = index;
					if(card.id === overId) moveOverId = index;
				});
				if(overId) {
					const element = item.cards.splice(moveAactiveId,1)[0];
					item.cards.splice(moveOverId,0,element);
				}
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
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
					onDragOver={handleDragOver}
				>
					{cycleColumns.map((item) => 
						<div key={item.cycleColumnId} className="cycle-item border rounded-lg mx-4 w-[100%]">
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
