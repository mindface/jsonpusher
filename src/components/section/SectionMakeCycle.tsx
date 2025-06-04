import { Suspense } from "react";
import { Titleline3h } from "../../stories/Titleline3h/Titleline3h";
import { Loading } from "../../stories/Loading/Loading";

import CMakeCycleIEdit from "./../parts/CMakeCycleIEdit";
import CMakeCycleList from "./../parts/CMakeCycleList";
import ContentMakeCycleModel from "./../ContentMakeCycleModel";

// ToDo 今後firebaseと連携してく際にコンポーネントを分ける
export default function SectionMakeCycle() {
	return (
		<section className="section-make-cycle">
			<Titleline3h title="サイクル構造を作成する" size="large" />
			{/* dnd-kitで動作検証が必要なためイシューにするか検討 */}
			{/* <div className="section-make">
				<div className="pb-4">
					<Input
						type="text"
						label="フレームワーク全体のタイトル"
						value={columnTitle}
						onChange={(value) => { columnTitleSet(value as string) }}
					/>
				</div>
				<div className="pb-4">
					<Input
						type="text"
						label="フレームワーク全体の詳細"
						value={columnDetail}
						onChange={(value) => { columnDetailSet(value as string) }}
					/>
				</div>
				<div className="pb-4">
					<Button label="構成の追加" onClick={addFrameBoxAction} />
				</div>
			</div> */}
			<div className="make-cycle-box">
				<div className="add-card-box">
					<div className="flex">
						<div className="w-[50%]">
							<ContentMakeCycleModel />
						</div>
						<div className="w-[50%]">
							<CMakeCycleIEdit type="add" />
							<Suspense fallback={<Loading />}>
								<CMakeCycleList />
							</Suspense>
						</div>
					</div>
					{/* <CMakeCycleList columns={cycleColumns} cycles={cycles}  /> */}
				</div>
			</div>
		</section>
	);
}
