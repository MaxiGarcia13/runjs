import {
  debounce,
  decodeText,
  encodeText,
  getParamFromUrl,
} from '@maxigarcia/js-utils';
import { create } from 'zustand';
import { CODE_URL_PARAM } from '@/constants/url';
import { removeUrlParam, setUrlParam } from '@/utils/url';
import { DEFAULT_VALUE } from './default-value.const';

interface EditorStore {
  code: string;
  trimmedCode: string;
  revealLine: number | null;
  setCode: (code: string) => void;
  debounceSetCode: (code: string) => void;
  requestRevealLine: (line: number) => void;
  clearRevealLine: () => void;
}
const DEBOUNCE_TIME = 500;

export const useEditorStore = create<EditorStore>((set) => {
  const paramCode = getParamFromUrl(CODE_URL_PARAM);

  const trimCode = (code: string) => {
    return code.trim().split('\n').filter((line) => line.trim() !== '').join('\n');
  };

  const setCode = (code: string) => {
    set({ code, trimmedCode: trimCode(code) });
    if (code) {
      setUrlParam(CODE_URL_PARAM, encodeText(code));
    } else {
      removeUrlParam(CODE_URL_PARAM);
    }
  };

  const code = paramCode ? decodeText(paramCode) : DEFAULT_VALUE;

  return ({
    code,
    trimmedCode: trimCode(code),
    revealLine: null,
    setCode,
    debounceSetCode: debounce(setCode, DEBOUNCE_TIME),
    requestRevealLine: (line) => set({ revealLine: line }),
    clearRevealLine: () => set({ revealLine: null }),
  });
});
