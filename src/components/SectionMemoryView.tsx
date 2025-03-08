"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import { Dialog } from "../stories/Dialog/Dialog";

import { useStoreMemoery } from "../store/memory";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { ForMatter } from "../utils/formater";
import { EventClickArg } from "@fullcalendar/core";

import styles from "../styles/calendar.module.css";

type EventItem = {
	id: string;
	title: string;
	detail: string;
	start: string;
	end: string;
	color: string;
};

export default function SectionMemoryView() {
	const { memories, getMemory } = useStoreMemoery();
	const [selectedEvent, setSelectedEvent] = useState<{
		title: string;
		detail: string;
		start: string;
		end?: string;
	} | null>(null);
	const carendarRef = useRef<FullCalendar | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	useEffect(() => {
		getMemory();
	}, [getMemory]);

	const carenderEvent = (item: EventClickArg) => {
		setSelectedEvent({
			title: item.event.title || "無題のイベント",
			detail: item.event.extendedProps.detail || "不明な詳細",
			start:
				ForMatter.formatDay(item.event.start ?? new Date()) ?? "不明な開始日時",
			end: ForMatter.formatDay(item.event.start ?? new Date()) ?? "不明な日時",
		});
		setDialogOpen(!dialogOpen);
	};

	const carenderEvents = useMemo<EventItem[]>(() => {
		return memories.map((memory) => ({
			id: String(memory.id),
			title: memory.title,
			detail: memory.detail,
			start: ForMatter.convertTimestampToDayjs(memory.createAt),
			end: ForMatter.convertTimestampToDayjs(memory.updateAt),
			color: "blue",
		}));
	}, [memories]);

	return (
		<section className="section-memory-task">
			<Titleline3h title="記録を確認する" size="large" />
			<div className="memory-carender-box sm:max-w-[860px] m-auto">
				<FullCalendar
					ref={carendarRef}
					navLinks={true}
					editable={true}
					selectable={true}
					plugins={[dayGridPlugin]}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,dayGridWeek,dayGridDay",
					}}
					initialView="dayGridMonth"
					events={carenderEvents ?? []}
					locales={[jaLocale]}
					locale="ja"
					eventClick={carenderEvent}
					eventClassNames={(info) => {
						if (info.event.title === "test001") {
							return [styles.eventHighlight];
						}
						return "rounded-lg p-1 cursor-pointer";
					}}
					eventDidMount={(info) => {
						const eventContainer = info.el.closest(".fc-daygrid-day-events");
						if (eventContainer) {
							eventContainer.classList.add(styles["custom-daygrid-events"]); // カスタムクラスを追加
						}
					}}
					dayMaxEvents={2}
					moreLinkContent={(args) => {
						return `さらに ${args.num} 件`;
					}}
				/>
				<Dialog type="none" ounterActionValue={dialogOpen}>
					<div className="inner p-4 border rounded-lg">
						<h3 className="pb-4">記録の詳細</h3>
						<p className="pb-4">
							<strong>タイトル:</strong> {selectedEvent?.title}
						</p>
						<div className="pb-4 max-h-[240px]">
							<strong>詳細:</strong> {selectedEvent?.detail}
						</div>
						<div className="flex">
							<p className="mr-4 pb-4">
								<strong>開始日時:</strong> {selectedEvent?.start}
							</p>
							{selectedEvent?.end && (
								<p className="pb-4">
									<strong>更新日時:</strong> {selectedEvent?.end}
								</p>
							)}
						</div>
					</div>
				</Dialog>
			</div>
		</section>
	);
}
