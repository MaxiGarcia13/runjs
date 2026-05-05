import { create } from 'zustand';
import { debounce } from '@/utils/debounce';

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
}

const STORAGE_KEY = 'runjs-code';
const DEBOUNCE_TIME = 1000;

export const useEditorStore = create<EditorStore>(set => ({
  code: localStorage.getItem(STORAGE_KEY) || '',
  setCode: debounce((code) => {
    localStorage.setItem(STORAGE_KEY, code);
    set({ code });
  }, DEBOUNCE_TIME),
}));
