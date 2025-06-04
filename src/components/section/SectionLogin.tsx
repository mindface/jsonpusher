import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../../stories/Button/Button";

export default function SectionLogin() {
	const session = useSession();

	const signInAction = () => {
		signIn();
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
				<div className="login-info pt-8">
					{session.status === "authenticated" ? (
						<div>
							<p className="pb-4">
								<Image
									src={session.data.user?.image ?? ""}
									className="rounded-lg"
									width={120}
									height={120}
									alt="user image"
									priority
									style={{ objectFit: "cover", height: "auto" }}
								/>
							</p>
							<p className="pb-4">EMAIL: {session.data.user?.email}</p>
							<p className="pb-4">NAME: {session.data.user?.name}</p>
							<Button
								label="サインアウト"
								onClick={() => {
									signOut();
								}}
							/>
						</div>
					) : (
						<Button
							label="google sign in"
							onClick={() => {
								signInAction();
							}}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
