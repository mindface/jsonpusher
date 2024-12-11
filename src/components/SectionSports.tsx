"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import bicycleImage from "../assets/images/bicycle.jpg";

import { Ccheck } from "../stories/Ccheck/Ccheck";
import { Button } from "../stories/Button/Button";
import { InputRange } from "../stories/InputRange/InputRange";
import { Textarea } from "../stories/TextArea/Textarea";
import { Title3h } from "../stories/title3h/Title3h";
// import { TextCommenter } from "../stories/TextComment/TextCommenter";
import { Dialog } from "../stories/Dialog/Dialog";

import { copyClipbord } from "../lib/copyClipbord";

import { useStoreSportsText } from "../store/sportText";

import SelectPartList from "../json/selectPartList.json";
import SelectSportsPatternList from "../json/selectSportsPatternList.json";
import SelectSportsList from "../json/selectSportsList.json";
import SelectLevelList from "../json/selectLevelList.json";

type SelectItem = {
	check: boolean;
	label: string;
	id?: string;
	settingsLevel?: number;
};

type SelectSportsPatternItem = {
	categoryId: string;
	categoryLabel: string;
	list: SelectItem[];
};

export default function SectionSports() {
	const { sportsText, setSportsText } = useStoreSportsText();
	const [viewTextSwitch, viewTextSwitchSet] = useState(false);
	const [selectParts, selectPartsSet] = useState<SelectItem[]>([]);
	const [selectPattern, selectPatternSet] = useState<SelectItem[]>([]);
	const [selectLevel, selectLevelSet] = useState<SelectItem[]>([]);
	const [selectSports, selectSportsSet] = useState<SelectItem[]>([]);
	const [userLevel, userLevelSet] = useState(0);
	const [sportsTextSituation, sportsTextSituationSet] = useState(sportsText);

	const selectPartList = SelectPartList;
	const selectSportsPatternList = SelectSportsPatternList;
	const selectLevelList = SelectLevelList;
	const selectSportsList = SelectSportsList;

	const checking = (list: SelectItem[], name: string) => {
		return list.some((item: SelectItem) => item.label === name);
	};

	const keyWord = useCallback((setAi?: string) => {
		let setText = "";
		const sportsArray: string[] = [];
		const selectPartsArray: string[] = [];
		selectSports.forEach((item) => {
			sportsArray.push(item.label);
			// setText += item.label + " ";
		});
		if (selectSports.length > 0 && setAi) {
			setText += JSON.stringify(sportsArray);
			setText += "カテゴリの";
		}
		selectParts.forEach((item) => {
			selectPartsArray.push(item.label);
			// setText += item.label + " ";
		});
		if (selectParts.length > 0 && setAi) {
			setText += JSON.stringify(selectPartsArray);
			setText += "に関して";
		}
		selectPattern.forEach((item) => {
			setText += item.label + " ";
		});
		if (selectPattern.length > 0 && setAi) {
			setText += "について";
		}
		selectLevel.forEach((item) => {
			setText += item.label;
		});
		if (selectLevel.length > 0 && setAi) {
			setText += "で教えてください。";
		}
		return setText;
	},[selectSports, selectParts, selectPattern, selectLevel]);

	useEffect(() => {
		const newKeyWord = keyWord("ai");
		if (newKeyWord !== sportsTextSituation) {
			sportsTextSituationSet(newKeyWord);
			setSportsText(newKeyWord);
		}
	},[keyWord, setSportsText,sportsTextSituation]);

	const changingParts = (check: boolean, label: string) => {
		if (check && !checking(selectParts, label)) {
			selectPartsSet([...selectParts, { check, label }]);
		} else {
			const list = selectParts.filter((item) => item.label !== label);
			selectPartsSet(list);
		}
	};

	const changingPattern = (check: boolean, label: string) => {
		if (check && !checking(selectPattern, label)) {
			selectPatternSet([...selectPattern, { check, label }]);
		} else {
			const list = selectPattern.filter((item) => item.label !== label);
			selectPatternSet(list);
		}
	};

	const changingLevel = (check: boolean, label: string) => {
		if (check && !checking(selectLevel, label)) {
			selectLevelSet([...selectLevel, { check, label }]);
		} else {
			const list = selectLevel.filter((item) => item.label !== label);
			selectLevelSet(list);
		}
	};

	const changingSports = (check: boolean, label: string, id: string) => {
		if (check && !checking(selectSports, label)) {
			selectSportsSet([...selectSports, { check, label, id }]);
		} else {
			const list = selectSports.filter((item) => item.label !== label);
			selectSportsSet(list);
		}
	};

	const copyAciton = () => {
		const copyText = keyWord("ai");
		copyClipbord(copyText);
	};

	const googlSearchAction = () => {
		const searchText = keyWord();
		const url = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
		window.open(url, "_blank");
	};

	const selectSportsPatternListForLevel = useMemo(() => {
		const list = selectSportsPatternList.map((item) => {
			return {
				...item,
				list: item.list?.filter((categoryItem) => {
					// ユーザーのレベル以下であれば表示させない
					if (categoryItem.settingsLevel < userLevel) {
						return item;
					}
				}),
			};
		});
		return list as SelectSportsPatternItem[];
	}, [userLevel, selectSportsPatternList]);

	return (
		<section className="section-health">
			<div className="text-center pb-4">
				選択をして、aiに質問するテキストを作成します。
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
					src={bicycleImage}
					className="rounded-lg"
					width={300}
					height={200}
					alt="sports image"
					priority
					style={{ objectFit: "cover", height: "auto" }}
				/>
				{viewTextSwitch && (
					<Textarea value={sportsTextSituation} outerClassName="p-8" />
				)}
			</div>
			<div className="flex justify-center p-2">
				<Dialog label="スポーツ項目を選択する" type="button">
					<div className="category-box--outer flex justify-center">
						{selectSportsList &&
							selectSportsList.map((categoryItem) => (
								<div className="category-box p-2" key={categoryItem.categoryId}>
									<h3 className="category-box__title">
										{categoryItem.categoryName}
									</h3>
									<ul className="select-type">
										{categoryItem.type.map((typeItem) => (
											<li className="p-2" key={typeItem.id}>
												<Ccheck
													partsId={typeItem.id}
													size="small"
													label={typeItem.label}
													changing={(check) =>
														changingSports(check, typeItem.label, typeItem.id)
													}
												/>
											</li>
										))}
									</ul>
								</div>
							))}
					</div>
				</Dialog>
			</div>
			<div className="select-sports-box flex pt-4 p-2">
				{selectSports &&
					selectSports.map((selectSports) => (
						<span
							className="inline-block mr-2 p-2 rounded-full border border-blue-400"
							key={`select${selectSports.id}`}
						>
							{selectSports.label}
						</span>
					))}
			</div>
			<div className="select-box flex justify-center pt-4">
				<ul className="select-parts pr-4">
					{selectPartList &&
						selectPartList.map((item) => (
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
					<li className="p-2">
						<div className="caption">
							<div className="relative inline-block">
								自身のレベル
								<div className="absolute -top-6 -right-8">
									<Dialog label="?" type="icon">
										<p className="pb-2">この設計の詳細について</p>
										<p>レベルが高くなると選択できるテキスト情報が増えます。</p>
									</Dialog>
								</div>
							</div>
						</div>
						<div className="inline-flex p-2">
							<InputRange
								value={userLevel}
								onChange={(value) => {
									userLevelSet(Number(value));
								}}
							/>
							{userLevel} level
						</div>
					</li>
					{selectSportsPatternListForLevel &&
						selectSportsPatternListForLevel.map((categoryItem) => (
							<li className="p-2" key={categoryItem.categoryId}>
								<Title3h title={categoryItem.categoryLabel} />
								<ul className="level-list">
									{categoryItem.list.map((levelItem) => (
										<li className="level-item pb-2" key={levelItem.id}>
											<Ccheck
												partsId={levelItem.id ?? ""}
												size="small"
												label={levelItem.label}
												changing={(check) =>
													changingPattern(check, levelItem.label)
												}
											/>
										</li>
									))}
								</ul>
							</li>
						))}
				</ul>
				<ul className="select-level">
					{selectLevelList &&
						selectLevelList.map((item) => (
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
				{/* <TextCommenter values={viewSubText} speed={200} interval={10000} /> */}
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
