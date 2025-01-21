"use client";
import { useState } from "react";
import { Button } from "../stories/Button/Button";
import { IconButton } from "../stories/IconButton/IconButton";
import { Input } from "../stories/Input/Input";
import { Textarea } from "../stories/TextArea/Textarea";

import styles from "../styles/sentEmailInfo.module.css";

import { ValidChecker } from "../utils/validChecker";

export default function SentEmailInfo() {
	const [viewSwitch, viewSwitchSet] = useState(false);
	const [sendTitle, sendTitleSet] = useState("");
	const [sendBody, sendBodySet] = useState("");
	const [sendName, sendNameSet] = useState("");
	const [sendEmail, sendEmailSet] = useState("");
	const [validationText, validationTextSet] = useState("");

	const sendAction = async () => {
		const sendItem = {
			title: sendTitle,
			body: sendBody,
			name: sendName,
			email: sendEmail,
		};
		if (sendTitle === "" || sendBody === "" || sendName === "") {
			validationTextSet("全ての入力項目を埋めてください。");
			return;
		}
		if (!ValidChecker.invalidCheckEmail(sendEmail)) {
			validationTextSet("メールを正しい形式で入力してください。");
			return;
		} else {
			validationTextSet("");
		}
		const res = await fetch("/api/email", {
			method: "POST",
			body: JSON.stringify(sendItem),
		});
		const data = await res.json();
		console.info(data);
	};

	return (
		<div className={[viewSwitch ? styles.open : ""].join(" ")}>
			<div
				className={[
					styles["sent-email-info"],
					"sent-email-info",
					"fixed",
					"z-10",
					"bottom-10",
					"right-10",
					"pb-4",
				].join(" ")}
			>
				<div className="pb-4">
					<IconButton
						size="small"
						backgroundColor="#fff"
						onClick={() => {
							viewSwitchSet(!viewSwitch);
						}}
					>
						<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"/>
						</svg>
					</IconButton>
				</div>
				<div className="sent-email-info__edit-wrap p-4 rounded-lg bg-white shadow-lg shadow-brack-500/40">
					<div className="sent-email-info__edit">
						<div className="pb-2">
							<Input
								type="text"
								value={sendTitle}
								label="タイトル"
								className="auto"
								outerClassName="label-black"
								onChange={(value) => {
									sendTitleSet(value as string);
								}}
								max={1000}
							/>
						</div>
						<div className="pb-2">
							<Input
								type="text"
								value={sendName}
								label="ネーム"
								className="auto"
								outerClassName="label-black"
								onChange={(value) => {
									sendNameSet(value as string);
								}}
								max={1000}
							/>
						</div>
						<div className="pb-2">
							<Input
								type="text"
								value={sendEmail}
								label="メールアドレス"
								className="auto"
								outerClassName="label-black"
								onChange={(value) => {
									sendEmailSet(value as string);
								}}
								max={1000}
							/>
						</div>
						<div className="pb-2">
							<Textarea
								label="詳細"
								className="auto"
								outerClassName="label-black"
								value={sendBody}
								onChange={(value) => {
									sendBodySet(value);
								}}
							/>
						</div>
						<p className="pb-2 text-black">
							sport.coach.plan@gmail.comからメールが届きます。
						</p>
						{validationText && (
							<p className="pb-2 text-rose-700">{validationText}</p>
						)}
						<div className="pb-2">
							<Button
								label="メールを送る"
								size="small"
								className="text-black"
								primary={false}
								onClick={() => {
									sendAction();
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
