export const copyClipbord = (text: string) => {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			alert("コピーしました。");
		})
		.catch((err) => {
			console.error("Failed to copy text: ", err);
		});
};
