import { create } from 'zustand';
import { debounce } from '@/utils/debounce';

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
}

export const useEditorStore = create<EditorStore>(set => ({
  code: '',
  setCode: debounce(code => set({ code }), 500),
}));
