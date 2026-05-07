import { create } from 'zustand';

interface HistoryStore {
  history: Array<{ payload: string; createdAt: number; label: string }>;
  push: (payload: string) => void;
  clear: () => void;
}

const HISTORY_STORAGE_KEY = 'runjs-history';

export const useHistory = create<HistoryStore>((set) => ({
  history: getHistoryValue(),
  push: (payload: string, label?: string) => {
    set((state) => {
      const history = [
        ...state.history,
        {
          payload,
          label: label ?? payload,
          createdAt: Date.now(),
        },
      ];

      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));

      return { history };
    });
  },
  clear: () => {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    set({ history: [] });
  },
}));

function getHistoryValue() {
  return localStorage.getItem(HISTORY_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY))
    : [];
}
