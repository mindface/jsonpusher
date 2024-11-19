"use client";
import { useState } from "react";
import { Ccheck } from "../stories/Ccheck/Ccheck";
import { Dialog } from "../stories/Dialog/Dialog";
import { Textarea } from "../stories/TextArea/Textarea";

type Props = {
	name: string;
}

export default function MoleculeDetailsMenuEvaluationMakeText(props: Props) {
	const { name } = props;
	const [makeText,makeTextSet] = useState("");
	const [_,dialogSet] = useState(false);

	return (
		<>
			<Dialog
				label="テキストをつくる"
				type="button"
				onChange={(value) => {
					dialogSet(value);
				}}
			>
				<div className="inner">
					<p className="p-4">
						{name}
					</p>
					<div className="p-4">
						<div className="w-[50%]">
							<Textarea value={makeText} onChange={(value) => {
								makeTextSet(value);
							}} />
						</div>
						<div className="w-[50%]">
							<Ccheck
								partsId="test"
								label="text"
								size="small"
								changing={() => {
								}}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}
