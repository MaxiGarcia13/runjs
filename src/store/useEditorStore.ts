import { create } from 'zustand';
import { debounce } from '@/utils/debounce';

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
}

const STORAGE_KEY = 'runjs-code';

export const useEditorStore = create<EditorStore>(set => ({
  code: localStorage.getItem(STORAGE_KEY) || '',
  setCode: debounce((code) => {
    localStorage.setItem('runjs-code', code);
    set({ code });
  }, 1000),
}));
