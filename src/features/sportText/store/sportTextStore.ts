import { create } from "zustand";

interface StoreSportsText {
  sportsText: string;
  isLoading: boolean;
  getSportsText: () => string;
  setSportsText: (text: string) => void;
}

export const useStoreSportsText = create<StoreSportsText>((set, get) => ({
  sportsText: "",
  isLoading: false,
  getSportsText: () => get().sportsText,
  setSportsText: (text) => {
    set({ sportsText: text });
  },
}));
