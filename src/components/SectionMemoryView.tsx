"use client"
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
	const carendarRef = useRef<FullCalendar|null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	useEffect(() => {
		getMemory()
	}, [getMemory]);

	const handlePrev = () => {
    const calendarApi = carendarRef.current?.getApi();
    calendarApi?.prev();
  };

  const handleNext = () => {
    const calendarApi = carendarRef.current?.getApi();
    calendarApi?.next();
  };

  const handleToday = () => {
    const calendarApi = carendarRef.current?.getApi();
    calendarApi?.today();
  };

	const carenderEvent = (item: EventClickArg) => {
    setSelectedEvent({
      title: item.event.title || '無題のイベント',
			detail: item.event.extendedProps.detail || '不明な詳細',
      start: ForMatter.formatDay(item.event.start ?? new Date) ?? '不明な開始日時',
      end: ForMatter.formatDay(item.event.start ?? new Date) ?? '不明な日時',
    });
		setDialogOpen(!dialogOpen);
	}

 const carenderEvents = useMemo<EventItem[]>(() => {
	return memories.map((memory) => ({
		id: String(memory.id),
		title: memory.title,
		detail: memory.detail,
		start: ForMatter.convertTimestampToDayjs(memory.createAt),
		end: ForMatter.convertTimestampToDayjs(memory.updateAt),
		color: "blue",
	}));
 },[memories]);

	return (
		<section className="section-memory-task">
			<Titleline3h title="記録を確認する" size="large" />
			<div className="memory-carender-box sm:max-w-[860px] m-auto">
				<div className="mb-4">
					<button className="mr-2 p-2 border rounded-lg" onClick={handlePrev}>前の月</button>
					<button className="mr-2 p-2 border rounded-lg" onClick={handleToday}>今月</button>
					<button className="p-2 border rounded-lg" onClick={handleNext}>次の月</button>
				</div>
				<FullCalendar
				  ref={carendarRef}
					navLinks={true}
					plugins={[dayGridPlugin]}
					headerToolbar={{
						right: 'dayGridMonth,dayGridWeek',
					}}
					initialView="dayGridMonth"
					events={carenderEvents ?? []}
					locales={[jaLocale]}
					locale="ja"
					eventClick={carenderEvent}
					eventClassNames={(info) => {
						if (info.event.title === 'test001') {
							return [styles.eventHighlight];
						}
						return "rounded-lg p-1 cursor-pointer";
					}}
				/>
				<Dialog
					type="none"
					ounterActionValue={dialogOpen}
				>
					<div className="inner p-4 border rounded-lg">
						<h3 className="pb-4">記録の詳細</h3>
						<p className="pb-4"><strong>タイトル:</strong> {selectedEvent?.title}</p>
						<div className="pb-4 max-h-[240px]"><strong>詳細:</strong> {selectedEvent?.detail}</div>
						<div className="flex">
							<p className="mr-4 pb-4"><strong>開始日時:</strong> {selectedEvent?.start}</p>
							{selectedEvent?.end && <p  className="pb-4"><strong>更新日時:</strong> {selectedEvent?.end}</p>}
						</div>
					</div>
				</Dialog>
			</div>
		</section>
	);
}
