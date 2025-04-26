"use client";
// import SectionLogin from "../../components/SectionLogin";
import SectionLoginFirebase from "../../components/SectionLoginFirebase";
import Pdfer from "../../components/Pdfer";

export default function Login() {
	return (
		<div className="min-h-screen p-8 pb-20 sm:p-20">
			{/* <SectionLogin /> */}
			<SectionLoginFirebase />
			<p>PDF</p>
			<Pdfer />
		</div>
	);
}
