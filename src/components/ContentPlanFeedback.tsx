"use client";
import { useEffect } from "react";
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import CNextPlanEdit from "./parts/CNextPlanEdit";
import CNextPlanList from "./parts/CNextPlanList";
import CPlanEdit from "./parts/CPlanEdit";
import CPlanList from "./parts/CPlanList";

import { useStorePlan } from "../features/plan/store/planStore";
import { useStoreNextPlan } from "../features/planNext/store/planNextStore";

import type { Plan } from "../type/plan";

import { copyClipbord } from "../utils/copyClipbord";

export default function ContentPlanFeedback() {
	const { plans, setPlans, getPlans } = useStorePlan();
	const { nextPlans, copyPlans, setNextPlans, getNextPlans } =
		useStoreNextPlan();

	const copyAciton = () => {
		copyPlans(plans);
	};

	const downloadJson = () => {
		const fileName = "data.json";
		const json = JSON.stringify({ plans: plans, nextPlans: nextPlans });
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const setFileAction = (value: FileList) => {
		const file = value[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const jsonData = JSON.parse(e.target?.result as string);
					if (jsonData.plans) {
						setPlans(jsonData.plans);
					}
					if (jsonData.nextPlans) {
						setNextPlans(jsonData.nextPlans);
					}
				} catch (err) {
					console.error(
						"ファイルの内容が不正です。JSON形式のファイルを選択してください。",
						err,
					);
				}
			};
			reader.readAsText(file);
		}
	};

	const copyJsonAciton = () => {
		copyClipbord(JSON.stringify(plans));
	};

	const copyTextAciton = (type: string) => {
		const columns = ["id", "title", "details", "connectId"];
		let formattedTable = "";
		if (type === "1") {
			const colWidths = columns.map((col) =>
				Math.max(
					col.length,
					...plans.map((row) => (row[col as keyof Plan] as string).length),
				),
			);
			const header = columns
				.map((col, index) => col.padEnd(colWidths[index]))
				.join(" | ");
			const separator = "-".repeat(header.length);
			const formattedRows = plans.map((row) =>
				columns
					.map((col, index) =>
						(row[col as keyof Plan] as string).padEnd(colWidths[index]),
					)
					.join(" | "),
			);
			formattedTable = [
				separator,
				header,
				separator,
				...formattedRows,
				separator,
			].join("\n");
		}

		if (type === "2") {
			const colWidths = columns.map((col) =>
				Math.max(
					col.length,
					...nextPlans.map((row) => (row[col as keyof Plan] as string).length),
				),
			);
			const header = columns
				.map((col, index) => col.padEnd(colWidths[index]))
				.join(" | ");
			const separator = "-".repeat(header.length);
			const formattedRows = nextPlans.map((row) =>
				columns
					.map((col, index) =>
						(row[col as keyof Plan] as string).padEnd(colWidths[index]),
					)
					.join(" | "),
			);
			console.log(colWidths);
			formattedTable = [
				separator,
				header,
				separator,
				...formattedRows,
				separator,
			].join("\n");
		}

		copyClipbord(formattedTable);
	};

	useEffect(() => {
		getPlans();
		getNextPlans();
	}, [getPlans, getNextPlans]);

	return (
		<div className="content">
			<div className="p-12">
				<div className="pb-2">
					<div className="p-2">
						ダウンロードしたjsonファイルを読み込めます。
					</div>
					<Input
						type="file"
						value=""
						onChange={(value) => {
							setFileAction(value as FileList);
						}}
					/>
				</div>
				<div className="pb-4">
					<Titleline3h title="計画の作成" />
				</div>
				<div className="flex">
					<div className="pb-8 pr-8 w-[50%]">
						<CPlanEdit type="add" />
						<CPlanList items={plans} />
					</div>
					<div className="pb-8 w-[50%]">
						<CNextPlanEdit type="add" />
						<CNextPlanList items={nextPlans} />
					</div>
				</div>
			</div>
			<div className="action-btns pb-4">
				<p className="pb-2">
					<Button
						label="現在の計画を次の計画にコピーする"
						onClick={() => {
							copyAciton();
						}}
					/>
				</p>
				<p className="pb-2">
					<Button
						label="jsonをコピーする"
						onClick={() => {
							copyJsonAciton();
						}}
					/>
				</p>
				<div className="flex pb-2">
					<p className="pr-2">
						<Button
							label="計画1のテキストをコピーする"
							onClick={() => {
								copyTextAciton("1");
							}}
						/>
					</p>
					<p className="pr-2">
						<Button
							label="計画2のテキストをコピーする"
							onClick={() => {
								copyTextAciton("2");
							}}
						/>
					</p>
				</div>
				<p className="pb-2">
					<Button
						label="計画をjsonデータにしてダウンロード"
						onClick={() => {
							downloadJson();
						}}
					/>
				</p>
			</div>
		</div>
	);
}
