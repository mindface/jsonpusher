"use client"
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { auth } from "../lib/firebaseClient";
import { signIn as signInByNextAuth } from "next-auth/react";

import { Button } from "../stories/Button/Button";
import { Input } from "../stories/Input/Input";

import {
  signInWithPopup,
  // GithubAuthProvider,
  GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword
} from "firebase/auth";

import type { AuthProvider } from "firebase/auth";

export default function SectionLoginFirebase() {
	const session = useSession();
	const [userSwitch, setUserSwitch] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const googleProvider = new GoogleAuthProvider();

	const signInAction = async () => {
		if(email === "" || password === "") return;

		try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
			console.log(userCredential);
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

	if (session.status === "loading") {
		return <p>loading...</p>;
	}

	return (
		<section className="section-login">
			<div className="login-box flex justify-center">
				<div className="text-box pl-4">
					<p className="pb-4 text-5xl">自分の評価を確認するために、</p>
					<p className="pb-2 text-5xl">情報のテキスト化をしてみる。</p>
				</div>
				<div className="login-info">
					<div>
					  <div className="pb-4">
							<Button
								label={userSwitch ? "新規登録" : "ログイン"}
								onClick={() => {
									setUserSwitch(!userSwitch);
								}}
							/>
						</div>
						<div className="pb-4">
							<Input type="text" label="EMAIL:" value={email} onChange={(value) => { setEmail(value as string) }} />
						</div>
						<div className="pb-4">
							<Input type="text" label="PASS:" value={password} onChange={(value) => { setPassword(value as string) }} />
						</div>
						<div className="pb-4">
							{ userSwitch ?
								<Button
									label="ログイン"
									onClick={() => {
										signInAction();
									}}
								/> :
								<Button
									label="ユーザーを作成"
									onClick={() => {
										createUserAction();
									}}
								/>}
						</div>
						<div className="pb-4">
							<Button
								label="google アカウント ログイン"
								onClick={() => {
									handleOAuthSignIn(googleProvider);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
