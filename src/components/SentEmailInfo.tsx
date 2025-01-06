"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../stories/Button/Button";
import { IconButton } from "../stories/IconButton/IconButton";
import { Input } from "../stories/Input/Input";
import { Textarea } from "../stories/TextArea/Textarea";

import styles from "../styles/sentEmailInfo.module.css";

import emailSvg from "../assets/images/email.svg";

import { ValidChecker } from "../lib/validChecker";

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
						<Image width={30} height={30} src={emailSvg} alt="email svg" />
					</IconButton>
				</div>
				<div className="sent-email-info__edit-wrap p-4 rounded-lg bg-white shadow-lg shadow-brack-500/40">
					<div className="sent-email-info__edit">
						<div className="pb-2">
							<Input
								type="text"
								value={sendTitle}
								label="タイトル"
								className="auto label-black"
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
								className="auto label-black"
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
								className="auto label-black"
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
