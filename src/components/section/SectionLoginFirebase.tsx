"use client";
import { useState, useRef, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { auth } from "../../lib/firebaseClient";
import { signIn as signInByNextAuth } from "next-auth/react";

import { Button } from "../../stories/Button/Button";
import { Input } from "../../stories/Input/Input";

import {
	signInWithPopup,
	// GithubAuthProvider,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";

import type { AuthProvider } from "firebase/auth";

export default function SectionLoginFirebase() {
	const session = useSession();
	const loginDom = useRef(null);
	const [userSwitch, setUserSwitch] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const googleProvider = new GoogleAuthProvider();

	const signInAction = async () => {
		if (email === "" || password === "") return;

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const idToken = await userCredential.user.getIdToken();
			await signInByNextAuth("credentials", {
				idToken,
				callbackUrl: "/",
			});
		} catch (error) {
			console.error(error);
		}
	};

	const createUserAction = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			alert("ユーザーが作成されました。");
		} catch (error) {
			console.error(error);
		}
	};
	const handleOAuthSignIn = (provider: AuthProvider) => {
		signInWithPopup(auth, provider)
			// 認証に成功したら ID トークンを NextAuth に渡す
			.then((credential) => credential.user.getIdToken(true))
			.then((idToken) => {
				signIn("credentials", { idToken, callbackUrl: "/" });
			})
			.catch((err) => console.error(err));
	};

	const changePaneleView = () => {
		if (!loginDom.current) return;
		const targetDom: HTMLDivElement = loginDom.current;
		targetDom?.classList.add("start");
		setTimeout(() => {
			targetDom?.classList.remove("start");
		}, 800);
	};

	if (session.status === "loading") {
		return <p>loading...</p>
	}

	return (
		<section className="section-login">
			<div
				className={[
					"login-box",
					"sm:flex",
					"justify-center",
					"sm:pb-4",
					userSwitch ? "animate-scale-up" : "animate-scale-down",
				].join(" ")}
				ref={loginDom}
			>
				<div className="text-box pl-4">
					<p className="pb-4 text-5xl">自分の評価を確認するために、</p>
					<p className="pb-2 text-5xl">情報をテキスト化してみる。</p>
				</div>
				<div className="login-info">
					<div className="p-8 border rounded-lg">
						<div className="pb-4 ">{userSwitch ? "ログイン" : "新規登録"}</div>
						<div className="pb-4">
							<Input
								type="email"
								label="EMAIL:"
								value={email}
								onChange={(value) => {
									setEmail(value as string);
								}}
							/>
						</div>
						<div className="pb-4">
							<Input
								type="password"
								label="PASS:"
								value={password}
								onChange={(value) => {
									setPassword(value as string);
								}}
							/>
						</div>
						<div className="pb-4 border-b">
							{userSwitch ? (
								<div className="pt-4 pb-4">
									<Button
										label="ログイン"
										className="login-btn"
										onClick={() => {
											signInAction();
										}}
									/>
								</div>
							) : (
								<div className="pt-4 pb-4">
									<Button
										label="ユーザーを作成"
										onClick={() => {
											createUserAction();
										}}
									/>
								</div>
							)}
							<div className="pt-4 pb-4">
								<Button
									label="googleアカウントでログイン"
									onClick={() => {
										handleOAuthSignIn(googleProvider);
									}}
								/>
							</div>
						</div>
						<div className="pt-4">
							<div className="pt-4">
								<Button
									label={userSwitch ? "新規登録へ変更" : "ログインへ変更"}
									onClick={() => {
										setUserSwitch(!userSwitch);
										changePaneleView();
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
