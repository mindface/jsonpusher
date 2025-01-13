"use client"
import { useEffect, useMemo, useState, useRef } from "react";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";
import { Dialog } from "../stories/Dialog/Dialog";

import { useStoreMemoery } from "../store/memory";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from '@fullcalendar/core/locales/ja';
import { ForMatter } from "../utils/formater";
import { EventClickArg } from '@fullcalendar/core';

type EventItem = {
	id: string;
	title: string;
	start: string;
	end: string;
	color: string;
};

export default function SectionMemoryView() {
	const { memories, getMemory } = useStoreMemoery();
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
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
      start: ForMatter.formatDay(item.event.start ?? new Date) ?? '不明な開始日時',
      end: ForMatter.formatDay(item.event.start ?? new Date) ?? '不明な日時',
    });
		setDialogOpen(!dialogOpen);
	}

 const carenderEvents = useMemo(() => {
	console.log(memories);
	return memories.map((memory) => ({
		id: String(memory.id),
		title: memory.title,
		start: ForMatter.convertTimestampToDayjs(memory.createAt),
		end: ForMatter.convertTimestampToDayjs(memory.createAt),
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
					plugins={[dayGridPlugin]}
					headerToolbar={{
						right: 'dayGridMonth,dayGridWeek',
					}}
					initialView="dayGridMonth"
					events={carenderEvents ?? []}
					locales={[jaLocale]}
					locale="ja"
					eventClick={carenderEvent}
				/>
				<Dialog
					type="none"
					ounterActionValue={dialogOpen}
				>
					<div className="inner">
						<h3>イベント詳細</h3>
						<p><strong>タイトル:</strong> {selectedEvent?.title}</p>
						<p><strong>開始日時:</strong> {selectedEvent?.start}</p>
						{selectedEvent?.end && <p><strong>終了日時:</strong> {selectedEvent?.end}</p>}
					</div>
				</Dialog>
			</div>
		</section>
	);
}
