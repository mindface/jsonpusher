type AsyncResult<T> = { success: boolean; data: T };

export const fetchPostApi = async <T, U>(
	url: string,
	sentData: U,
): Promise<AsyncResult<T>> => {
	try {
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(sentData),
		});
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data: T = await res.json();
		return { success: true, data };
	} catch (error) {
		console.error(error);
		return { success: false, data: null as unknown as T };
	}
};
