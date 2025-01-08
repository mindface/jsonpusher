interface Window {
	adsbygoogle?: { [key: string]: unknown }[];
	user: {
		uid: string;
	};
}

declare global {
	const window: Window;
}
