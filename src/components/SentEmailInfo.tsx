"use client"
import { useState } from "react";
import Image from 'next/image'
import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";
import { Textarea } from "../stories/TextArea/Textarea";
import { IconButton } from "../stories/IconButton/IconButton";

import styles from "../styles/sentEmailInfo.module.css";

import emailSvg from "../assets/images/email.svg";

export default function SentEmailInfo() {
	const [viewSwitch,viewSwitchSet] = useState(false);
	const [sendTitle,sendTitleSet] = useState("");
	const [sendBody,sendBodySet] = useState("");
	const [sendName,sendNameSet] = useState("");
	const [sendEmail,sendEmailSet] = useState("");

	const sendAction = async () => {
		const sendItem = {
			title: sendTitle,
			body: sendBody,
			name: sendName,
			email: sendEmail
		};
		const res = await fetch("/api/email",{
			method: "POST",
			body: JSON.stringify(sendItem)
		});
		const data = await res.json();
	}

	return (
		<div className={[viewSwitch ? styles["open"] : ""].join(" ")}>
			<div className={[styles["sent-email-info"],"sent-email-info","fixed","bottom-10","right-10","pb-4"].join(" ")}>
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
								className="auto"
								onChange={(value) => { sendTitleSet(value) }}
								max={1000}
							/>
						</div>
						<div className="pb-2">
							<Input
								type="text"
								value={sendName}
								label="ネーム"
								className="auto"
								onChange={(value) => { sendNameSet(value) }}
								max={1000}
							/>
						</div>
						<div className="pb-2">
							<Input
								type="text"
								value={sendEmail}
								label="メールアドレス"
								className="auto"
								onChange={(value) => { sendEmailSet(value) }}
								max={1000}
							/>
						</div>		
						<div className="pb-2">
							<Textarea
								label="詳細"
								className="auto"
								value={sendBody}
								onChange={(value) => { sendBodySet(value) }}
							/>
						</div>
						<p className="pb-2">sport.coach.plan@gmail.comからメールが届きます。</p>
						<div className="pb-2">
							<Button
								label="送る"
								size="small"
								primary={false}
								onClick={() => { sendAction(); }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
