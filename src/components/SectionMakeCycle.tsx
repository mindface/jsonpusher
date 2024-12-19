"use client"
import { Titleline3h } from "../stories/Titleline3h/Titleline3h";

import CMakeCycleIEdit from "./CMakeCycleIEdit";
import CMakeCycleList from "./CMakeCycleList";

import { useStoreCycle } from "../store/cycle";

// ToDo 今後firebaseと連携してく際にコンポーネントを分ける
export default function SectionMakeCycle() {
	const { cycles } = useStoreCycle();

	return (
		<section className="section-make-cycle">
			<Titleline3h title="サイクル構造を作成する" size="large" />
		  <div className="login-box">
				<div className="add-card-box">
					<CMakeCycleIEdit type="add" />
					<CMakeCycleList items={cycles} />
				</div>
			</div>
		</section>
	);
}
