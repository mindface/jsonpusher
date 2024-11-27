"use client";
import { useState } from "react";
import { Button } from "../stories/Button/Button";
import { Dialog } from "../stories/Dialog/Dialog";
import { Textarea } from "../stories/TextArea/Textarea";

import menuInfoTagTextList from "../json/menuInfoTagTextList.json";

type Props = {
	name: string;
	infoId: string;
}

export default function DialogDetailsMenuEvaluationMakeText(props: Props) {
	const { name, infoId } = props;
	const [makeText,makeTextSet] = useState("");
	return (
		<>
			<Dialog
				label="テキストをつくる"
				type="button"
			>
				<div className="inner">
					<p className="p-4">
						{name}
					</p>
					<div className="p-4 flex">
						<div className="w-[50%]">
							<Textarea value={makeText} onChange={(value) => {
								makeTextSet(value);
							}} />
						</div>
						<div className="w-[50%]">
							{ menuInfoTagTextList.map((item) => item.pathId === infoId &&
								item.tagList.map((item) => <span key={item.tagId} className="inline-block mr-4"><Button
									label={item.tagName}
									size="small"
									onClick={() => {
										if(makeText === "") {
											makeTextSet(item.text);
										}else {
											makeTextSet( makeText + "\n\n" + item.text);
										}
									}}
								/></span>)) }
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}
