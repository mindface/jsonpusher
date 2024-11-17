"use client";
import { useState } from "react";
import { InputRange } from "../stories/InputRange/InputRange";
import { Dialog } from "../stories/Dialog/Dialog";

import { EvaluationType, DialogType, MenuInfoList } from "../type/componentContent";

import MoleculeDetailsMenuEvaluationMakeText from "./MoleculeDetailsMenuEvaluationMakeText";

type Props = {
	leaveNumber: number;
	menuInfoList: MenuInfoList[];
	evaluationObj: EvaluationType;
	onEvaluationObjSet: (obj:EvaluationType) => void
}

export default function ContentDetailsMenuEvaluation(props: Props) {
	const { leaveNumber, menuInfoList, evaluationObj, onEvaluationObjSet } = props;
	const initialDialogObjState: DialogType = Object.fromEntries(
		menuInfoList.map((item) => [item.pathId, false]),
	);
	const [dialogObj, dialogObjSet] = useState<DialogType>(
		initialDialogObjState,
	);

	return (
		<div className="details-menu-list mr-8 p-4 border rounded-lg md:w-[50%]">
			{menuInfoList.map((menuItem, index) => (<div key={`overallEvaluation${menuItem.pathId}`}>
				{ leaveNumber <= (evaluationObj[menuItem.pathId]) &&
					<div
						className={[
							"p-2",
							menuInfoList.length === index + 1 ? "" : "border-b",
						].join(" ")}
					>
						<p className="pb-4">
							{menuItem.name}
						</p>
						<div className="md:flex">
							<Dialog
								label="ページ内容を確認"
								type="button"
								onChange={(value) => {
									dialogObjSet({
										...dialogObj,
										[menuItem.pathId]:value
									});
								}}
							>
								<div className="inner">
									<p className="pb-4">
										{menuItem.name}
									</p>
									{ dialogObj[menuItem.pathId] && <iframe src={menuItem.path} className="w-full h-[80vh]"></iframe> }
								</div>
							</Dialog>
							{/* <div className="pl-4">
								<MoleculeDetailsMenuEvaluationMakeText name={menuItem.name} />
							</div> */}
						</div>
						<div className="flex pt-4">
							<InputRange
								value={evaluationObj[menuItem.pathId]}
								max={100}
								onChange={(value) => {
									onEvaluationObjSet({
										...evaluationObj,
										[menuItem.pathId]: Number(value),
									});
								}}
							/>
							<span className="text-4xl text-slate-500 dark:text-slate-300">
								{evaluationObj[menuItem.pathId]}
							</span>
						</div>
					</div>}
			</div>))}
		</div>
	);
}
