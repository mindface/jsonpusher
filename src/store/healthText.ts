import { create } from "zustand";

interface StoreHealthText {
	healthText: string;

	getHealthText: () => string;
	setHealthText: (text: string) => void;
}

export const useStoreHealthText = create<StoreHealthText>((set, get) => ({
	healthText: "",
	getHealthText: () => get().healthText,
	setHealthText: (text) => {
		set({
			healthText: text,
		});
	},
}));
