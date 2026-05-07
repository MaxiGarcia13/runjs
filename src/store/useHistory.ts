import { create } from 'zustand';

export interface History {
  payload: string;
  createdAt: number;
  label: string;
}

interface HistoryStore {
  histories: Array<History>;
  clear: () => void;
  remove: (createdAt: number) => void;
  addHistory: (payload: string) => void;
  editHistory: (editedHistory: Partial<History>) => void;
}

const HISTORY_STORAGE_KEY = 'runjs-history';

export const useHistory = create<HistoryStore>((set) => ({
  histories: getHistoryValue(),
  clear: () => {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    set({ histories: [] });
  },
  remove: (createdAt: number) => {
    set((state) => {
      const histories = state.histories
        .filter((history) => history.createdAt !== createdAt);

      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(histories));
      return { histories };
    });
  },
  addHistory: (payload: string, label?: string) => {
    set((state) => {
      const exist = state.histories.find((history) => history.payload === payload);

      if (exist) {
        return { histories: state.histories };
      }

      const histories = sortHistories([
        ...state.histories,
        {
          payload,
          label,
          createdAt: Date.now(),
        },
      ]);

      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(histories));

      return { histories };
    });
  },
  editHistory: (editedHistory: Partial<History>) => {
    set((state) => {
      const histories = state.histories
        .map((history) =>
          history.createdAt === editedHistory.createdAt
            ? { ...history, ...editedHistory }
            : history,
        );

      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(histories));
      return { histories };
    });
  },
}));

function getHistoryValue() {
  return sortHistories(localStorage.getItem(HISTORY_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY))
    : []);
}

function sortHistories(histories: Array<History>) {
  return histories.sort((a, b) => b.createdAt - a.createdAt);
}
