import {
  debounce,
  decodeText,
  encodeText,
  getUrlParam,
  removeUrlParam,
  setUrlParams,
} from '@maxigarcia/js-utils';
import { create } from 'zustand';
import { CODE_URL_PARAM } from '@/constants/url';

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
  debounceSetCode: (code: string) => void;
}
const DEBOUNCE_TIME = 500;

export const useEditorStore = create<EditorStore>((set) => {
  const setCode = (code: string) => {
    set({ code });

    if (code) {
      setUrlParams({ [CODE_URL_PARAM]: encodeText(code) });
    } else {
      removeUrlParam(CODE_URL_PARAM);
    }
  };

  return ({
    code: getUrlParam(CODE_URL_PARAM) ? decodeText(getUrlParam(CODE_URL_PARAM)) : '',
    setCode,
    debounceSetCode: debounce(setCode, DEBOUNCE_TIME),
  });
});
