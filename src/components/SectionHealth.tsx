"use client";
import { useState } from "react";
import Image from "next/image";
import healthImage from "../assets/images/health.jpg";

import { Ccheck } from "../stories/Ccheck/Ccheck";
import { Button } from "../stories/Button/Button";
import { Textarea } from "../stories/TextArea/Textarea";

import SelectPartList from "../json/selectPartList.json";
import SelectPatternList from "../json/selectPatternList.json";
import SelectLevelList from "../json/selectLevelList.json";

type SelectList = { check: boolean; name: string };

export default function SectionHealth() {
	const [viewTextSwitch, viewTextSwitchSet] = useState(false);
	const [selectParts, selectPartsSet] = useState<SelectList[]>([]);
	const [selectPattern, selectPatternSet] = useState<SelectList[]>([]);
	const [selectLevel, selectLevelSet] = useState<SelectList[]>([]);
	const selectPartList = SelectPartList;
	const selectPatternList = SelectPatternList;
	const selectLevelList = SelectLevelList;

	const checking = (list: SelectList[], name: string) => {
		return list.some((item: SelectList) => item.name === name);
	};

	const keyWord = (setAi?: string) => {
		let setText = "";
		selectParts.forEach((item) => {
			setText += item.name + " ";
		});
		setText += "に関して";
		selectPattern.forEach((item) => {
			setText += item.name + " ";
		});
		if (selectPattern.length > 0 && setAi) {
			setText += "について";
		}
		selectLevel.forEach((item) => {
			setText += item.name;
		});
		if (selectLevel.length > 0 && setAi) {
			setText += "で教えてください。";
		}
		return setText;
	};

	const changingParts = (check: boolean, name: string) => {
		if (check && !checking(selectParts, name)) {
			selectPartsSet([...selectParts, { check, name }]);
		} else {
			const list = selectParts.filter((item) => item.name !== name);
			selectPartsSet(list);
		}
	};

	const changingPattern = (check: boolean, name: string) => {
		if (check && !checking(selectPattern, name)) {
			selectPatternSet([...selectPattern, { check, name }]);
		} else {
			const list = selectPattern.filter((item) => item.name !== name);
			selectPatternSet(list);
		}
	};

	const changingLevel = (check: boolean, name: string) => {
		if (check && !checking(selectLevel, name)) {
			selectLevelSet([...selectLevel, { check, name }]);
		} else {
			const list = selectLevel.filter((item) => item.name !== name);
			selectLevelSet(list);
		}
	};

	const copyAciton = () => {
		let copyText = keyWord("ai");
		navigator.clipboard
			.writeText(copyText)
			.then(() => {
				alert("コピーしました。");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	const googlSearchAction = () => {
		let searchText = keyWord();
		const url = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
		window.open(url, "_blank");
	};

	return (
		<section className="section-health">
			<div className="flex justify-center">
				<Image
					src={healthImage}
					width={300}
					height={300}
					alt="health image"
					priority
					style={{ objectFit: "cover" }}
				/>
				{viewTextSwitch && <Textarea value={keyWord("ai")} />}
			</div>
			<div className="select-box flex pt-4">
				<ul className="select-parts">
					{selectPartList.map((item) => (
						<li className="p-2" key={item.id}>
							<Ccheck
								partsId={item.id}
								size="small"
								primary={true}
								label={item.label}
								changing={(check) => changingParts(check, item.label)}
							/>
						</li>
					))}
				</ul>
				<ul className="select-pattern">
					{selectPatternList.map((item) => (
						<li className="p-2" key={item.id}>
							<Ccheck
								partsId={item.id}
								size="small"
								label={item.label}
								changing={(check) => changingPattern(check, item.label)}
							/>
						</li>
					))}
				</ul>
				<ul className="select-level">
					{selectLevelList.map((item) => (
						<li className="p-2" key={item.id}>
							<Ccheck
								partsId={item.id}
								size="small"
								label={item.label}
								changing={(check) => changingLevel(check, item.label)}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className="flex justify-end pb-2">
				<Ccheck
					partsId={"viewTextSwitch"}
					size="small"
					primary={true}
					label={"コピーするテキストの確認"}
					changing={(check) => viewTextSwitchSet(check)}
				/>
			</div>
			<div className="flex justify-end">
				<Button label="copy" size="small" onClick={copyAciton} />
				<Button
					label="google search"
					size="small"
					onClick={googlSearchAction}
				/>
			</div>
		</section>
	);
}
