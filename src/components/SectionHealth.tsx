"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import healthImage from "../assets/images/health.jpg";

import { Button } from "../stories/Button/Button";
import { Ccheck } from "../stories/Ccheck/Ccheck";
import { Textarea } from "../stories/TextArea/Textarea";

import SelectLevelList from "../json/selectLevelList.json";
import SelectPartList from "../json/selectPartList.json";
import SelectPatternList from "../json/selectPatternList.json";
// import SelectHealthInfoCategoryList from "../json/selectHealthInfoCategoryList.json";

import { useStoreHealthText } from "../store/healthText";

import { copyClipbord } from "../lib/copyClipbord";

type SelectList = { check: boolean; name: string };
type SelectTextList = { check: boolean; list: string[] };

export default function SectionHealth() {
	const { healthText, setHealthText } = useStoreHealthText();

	const [viewTextSwitch, viewTextSwitchSet] = useState(false);
	const [selectParts, selectPartsSet] = useState<SelectList[]>([]);
	const [selectPattern, selectPatternSet] = useState<SelectList[]>([]);
	const [selectLevel, selectLevelSet] = useState<SelectList[]>([]);
	// const [selectSetText, selectSetTextSet] = useState<SelectTextList[]>([]);
	const [healthTextSituation, healthTextSituationSet] = useState(healthText);
	const selectPartList = SelectPartList;
	const selectPatternList = SelectPatternList;
	const selectLevelList = SelectLevelList;
	// const selectHealthInfoCategoryList = SelectHealthInfoCategoryList;

	const checking = (
		list: SelectList[] | SelectTextList[],
		name: string | string[],
	) => {
		if (typeof name !== "string") {
			return (list as SelectTextList[]).some((item: SelectTextList) =>
				item.list.some((text) => name.includes(text)),
			);
		}
		return (list as SelectList[]).some(
			(item: SelectList) => item.name === name,
		);
	};

	const keyWord = useCallback(
		(setAi?: string) => {
			let setText = "";
			const selectPartsArray: string[] = [];
			for (const selectPart of selectParts) {
				selectPartsArray.push(selectPart.name);
			}
			if (selectParts.length > 0 && setAi) {
				setText += JSON.stringify(selectPartsArray);
				setText += "に関して";
			}
			for (const item of selectPattern) {
				setText += `${item.name} `;
			}
			if (selectPattern.length > 0 && setAi) {
				setText += "ことについて";
			}
			for (const item of selectLevel) {
				setText += item.name;
			}
			if (selectLevel.length > 0 && setAi) {
				setText += "で教えてください。";
			}
			// selectSetText.forEach((item) => {
			// 	item.list.forEach((text) => {
			// 		setText += text;
			// 	});
			// });
			if (
				selectParts.length > 0 ||
				selectPattern.length > 0 ||
				selectLevel.length > 0
			) {
				setText = `健康を保つことの前提で ${setText}`;
			}
			return setText;
		},
		[selectParts, selectPattern, selectLevel],
	);

	useEffect(() => {
		const newKeyWord = keyWord("ai");
		if (newKeyWord !== healthTextSituation) {
			healthTextSituationSet(newKeyWord);
			setHealthText(newKeyWord);
		}
	}, [keyWord, setHealthText, healthTextSituation]);

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

	// const changingSetText = (check: boolean, list: string[]) => {
	// 	if (check && !checking(selectSetText, list)) {
	// 		selectSetTextSet([...selectSetText, { check, list }]);
	// 	} else {
	// 		const _list = selectSetText.filter(
	// 			(item) => !item.list.some((text: string) => list.includes(text)),
	// 		);
	// 		selectSetTextSet(_list);
	// 	}
	// };

	const copyAciton = () => {
		const copyText = keyWord("ai");
		copyClipbord(copyText);
	};

	const googlSearchAction = () => {
		const searchText = keyWord();
		const url = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
		window.open(url, "_blank");
	};

	return (
		<section className="section-health">
			<div className="text-center pb-4">
				<Ccheck
					partsId={"viewTextSwitch"}
					size="small"
					primary={true}
					label={"コピーするテキストの確認"}
					changing={(check) => viewTextSwitchSet(check)}
				/>
			</div>
			<div className="flex justify-center pb-8">
				<Image
					src={healthImage}
					className="rounded-lg"
					width={300}
					height={300}
					alt="health image"
					priority
					style={{ width: "auto", objectFit: "cover" }}
				/>
				{viewTextSwitch && (
					<Textarea value={healthTextSituation} outerClassName="p-8" />
				)}
			</div>
			<div className="select-box flex justify-center pt-4">
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
				{/* <ul className="select-info-category">
					{selectHealthInfoCategoryList.map((item) => (
						<li className="p-2" key={item.id}>
							<Ccheck
								partsId={item.id}
								size="small"
								label={item.label}
								changing={(check) => changingSetText(check, item.textList)}
							/>
						</li>
					))}
				</ul> */}
			</div>
			<div className="flex justify-end">
				<Button
					label="copy"
					size="small"
					onClick={copyAciton}
					className="mr-2"
				/>
				<Button
					label="google search"
					size="small"
					onClick={googlSearchAction}
				/>
			</div>
		</section>
	);
}
