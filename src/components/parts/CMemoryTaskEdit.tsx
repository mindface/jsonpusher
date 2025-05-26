"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../stories/Button/Button";
import { Input } from "../../stories/Input/Input";

import { useStoreMemoery } from "../../store/memory";

import type { Memory } from "../../type/memory";
import "quill/dist/quill.snow.css";

type Props = {
	type: string;
	item?: Memory;
};

export default function CMemoryTaskEdit(props: Props) {
	const { type, item } = props;
	const [memoryTaskTitle, memoryTaskTitleSet] = useState(item?.title ?? "");
	const [preView, preViewSet] = useState(false);
	const [quillCounter,quillCounterSet] = useState(0);
	const [editorContent, editorContentSet] = useState<string>(
		item?.detail ?? "",
	);
	const editorBoxRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<HTMLDivElement>(null);
	const quillRef = useRef<any>(null);
	const { addMemory, updateMemory, deleteMemory } = useStoreMemoery();

	const addPlanAction = () => {
		addMemory(memoryTaskTitle, quillRef.current?.root.innerHTML ?? "");
	};

	const updatePlanAction = () => {
		console.log(quillRef.current?.root.innerHTML);
		if (item?.id && item?.connectId) {
			const updateItem = {
				...item,
				title: memoryTaskTitle,
				detail: quillRef.current?.root.innerHTML ?? "",
			};
			updateMemory(updateItem);
		}
	};

	const editorSwitchAction = () => {
		preViewSet(!preView);
		editorContentSet(quillRef.current?.root.innerHTML || "");
	};

	const deletePlanAction = () => {
		if (item) {
			deleteMemory(item);
			preViewSet(false);
		}
	};

	useEffect( () => {
		if (editorRef.current && !quillRef.current) {
			import("quill").then((Quill) => {
				if(quillCounter === 0) {
					quillRef.current = new Quill.default(editorRef.current!, {
						theme: "snow",
						modules: {
							toolbar: [
								[{ header: [1, 2, 3, false] }],
								["bold", "italic", "underline", "strike"],
								[{ list: "ordered" }, { list: "bullet" }],
								["blockquote", "code-block"],
								[{ align: [] }],
								[{ color: [] }, { background: [] }],
								[
									"link",
									// "image"
								],
								["clean"],
							],
						},
					});
					quillCounterSet(1);
				}
				let isStyleApplied = false;

				const applyStyleOnce = () => {
          const targetDom = editorBoxRef.current?.querySelector(".ql-toolbar");
					console.log(targetDom);
          
          if (targetDom && !isStyleApplied) {
            targetDom.setAttribute("style", "display:none;");
            isStyleApplied = true;
            
            if (item?.detail) {
              quillRef.current?.clipboard.dangerouslyPasteHTML(item.detail);
            }
            
            quillCounterSet(1);
            return;
          }
          
          if (!isStyleApplied) {
            requestAnimationFrame(applyStyleOnce);
          }
        };
        
        requestAnimationFrame(applyStyleOnce);

				if (item?.detail) {
					quillRef.current?.clipboard.dangerouslyPasteHTML(item.detail);
				}
			});
		}

	},[item?.detail]);

	return (
		<div className="pb-4">
			<div className="mb-4 pb-4 border-b">
				<Input
					type="text"
					value={memoryTaskTitle}
					className="w-full"
					outerClassName={type === "edit" ? "label-dark" : ""}
					label="タイトル"
					onChange={(value) => {
						memoryTaskTitleSet(value as string);
					}}
					max={1000}
				/>
			</div>
			<div
				className="pb-2"
			>
				<div className="editor-box" ref={editorBoxRef}>
					<div className="editor-switch p-4">
						<Button
							label={preView ? "編集に戻る" : "プレビューに表示する"}
							size="small"
							primary={false}
							onClick={() => {
								editorSwitchAction();
							}}
						/>
					</div>
					<div className="editor-content p-8 relative">
						<div className="editor-wrap">
							<div ref={editorRef} />
						</div>
						{preView && (
							<div
								className="absolute top-0 bottom-0 left-0 p-4 bg-white showdow w-[100%]"
								dangerouslySetInnerHTML={{ __html: editorContent }}
							></div>
						)}
					</div>
				</div>
				<div className="pt-4 flex">
					<div className="pr-4">
						<Button
							label={type === "edit" ? "更新" : "追加"}
							size="small"
							primary={true}
							onClick={() => {
								if (type === "edit") {
									updatePlanAction();
								} else {
									addPlanAction();
								}
							}}
						/>
					</div>
					{type === "edit" && (
						<Button
							label="削除"
							size="small"
					    className="text-black"
							primary={false}
							onClick={() => {
								deletePlanAction();
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
