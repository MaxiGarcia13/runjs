import {
  debounce,
  decodeText,
  encodeText,
  getParamFromUrl,
} from '@maxigarcia/js-utils';
import { create } from 'zustand';
import { CODE_URL_PARAM } from '@/constants/url';
import { removeUrlParam, setUrlParam } from '@/utils/url';

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
  debounceSetCode: (code: string) => void;
}
const DEBOUNCE_TIME = 500;

export const useEditorStore = create<EditorStore>((set) => {
  const paramCode = getParamFromUrl(CODE_URL_PARAM);

  const setCode = (code: string) => {
    set({ code });

    if (code) {
      setUrlParam(CODE_URL_PARAM, encodeText(code));
    } else {
      removeUrlParam(CODE_URL_PARAM);
    }
  };

  return ({
    code: paramCode ? decodeText(paramCode) : '',
    setCode,
    debounceSetCode: debounce(setCode, DEBOUNCE_TIME),
  });
});
