import {
  debounce,
  decodeText,
  encodeText,
  getUrlParam,
  removeUrlParam,
  setUrlParams,
} from '@maxigarcia/js-utils';
import { create } from 'zustand';

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
}

const CODE_URL_PARAM = 'code';
const DEBOUNCE_TIME = 800;

export const useEditorStore = create<EditorStore>((set) => ({
  code: getUrlParam(CODE_URL_PARAM) ? decodeText(getUrlParam(CODE_URL_PARAM)) : '',
  setCode: debounce((code: string) => {
    set({ code });

    if (code) {
      setUrlParams({ [CODE_URL_PARAM]: encodeText(code) });
    } else {
      removeUrlParam(CODE_URL_PARAM);
    }
  }, DEBOUNCE_TIME),
}));
