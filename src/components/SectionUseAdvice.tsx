"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Title3h } from "../stories/title3h/Title3h";
import { Button } from "../stories/Button/Button";
import { InputRange } from "../stories/InputRange/InputRange";

import SelectAdvice from "../json/selectAdvice.json";

export default function SectionUseAdvice() {
	const [experiencePoints, experiencePointsSet] = useState(0);
	const selectAdvice = SelectAdvice;
	const router = useRouter();

	const selectAdviceList = useMemo(() => {
		return selectAdvice.list.map((item) => {
			return { value: item.id, label: item.label, skillLevel: item.skillLevel };
		});
	}, [selectAdvice]);

	const goPlanAction = () => {
		router.push("/planFeedback");
	};

	return (
		<section className="section-level-up">
			<Title3h title="アドバイスをどう使うか" size="large" />
			<div className="details">
				<p className="text pb-2">
					アドバイスに関しては、必ず検証してみることが普通でしょうか。
				</p>
				<p className="text pb-2">
					アドバイスが運動の癖を把握した情報量かも考えることになります。
				</p>
				<p className="text pb-4">
					実際に目的と検証過程から利用して、継続的にメリットがあれば採用することになりそうでしょうか。
				</p>
				<div className="details-action p-8 pb-4">
					<div className="action-box p-4 border rounded-lg max-w-[420px]">
						<p className="pb-2">アドバイスを使う野球の例</p>
						<div className="flex">
							<InputRange
								value={experiencePoints}
								onChange={(value) => {
									experiencePointsSet(Number(value));
								}}
								max={10}
							/>
							経験値 {experiencePoints}
						</div>
					</div>
				</div>
				<div className="details-result p-4 pb-8">
					{selectAdviceList.map((adviceItem) => (
						<div key={adviceItem.value} className="">
							<div>
								{adviceItem.skillLevel < experiencePoints && (
									<div className="pb-2">{adviceItem.label}</div>
								)}
							</div>
						</div>
					))}
				</div>
				<Title3h title="アドバイスは経験があると1つのパタンになる" />
				<div className="mb-4 p-4 border rounded-lg max-w-[640px]">
					<p className="text pb-4">
						誰かからアドバイスされて、練習した経験があるのではないでしょうか。
					</p>
					<p className="text pb-4">
						経験を積むと情報が増えていくので、その1つにアドバイスされたことが含まれるようになります。
					</p>
					<p className="text pb-4">
						ケースや調子の応じて利用するかどうか選択することになるので、自分で評価を持つといいかもしれません。
					</p>
				</div>
				<div className="pb-2">
					<Button
						label="計画を見直す"
						onClick={() => {
							goPlanAction();
						}}
					/>
				</div>
			</div>
		</section>
	);
}
