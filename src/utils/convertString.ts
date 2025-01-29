export const convertLinesToParagraphs = (text: string) => {
	const normalizedText = text.replace(/\r\n/g, "\n");
	const paragraphs = normalizedText.split("\n");
	if (text === "") {
		return "";
	}
	const newParagraphs = paragraphs
		.map((paragraph) => {
			return `<p>${paragraph}</p>`;
		})
		.join("");
	return newParagraphs;
};

export const sanitaizeText = (text: string) => {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
};

export const stringWidth = (str:string): number => {
	let width = 0;
	for (const char of str) {
		width += char.match(/[^\x01-\x7E]/) ? 2 : 1;
	}
	return width;
}

export const padEndWidth = (str:string, targetWidth: number): string => {
	let currentidth = stringWidth(str);
	const padding = " ".repeat(targetWidth-currentidth);
	return str + padding;
}
