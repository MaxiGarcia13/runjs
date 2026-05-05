import { create } from 'zustand';
import { debounce } from '@/utils/debounce';
import { decodeUrlParam, encodeUrlParam, getUrlParam, removeUrlParam, setUrlParams } from '@/utils/url';

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
}

const CODE_URL_PARAM = 'code';
const DEBOUNCE_TIME = 800;

export const useEditorStore = create<EditorStore>((set) => ({
  code: getUrlParam(CODE_URL_PARAM) ? decodeUrlParam(getUrlParam(CODE_URL_PARAM)) : '',
  setCode: debounce((code) => {
    set({ code });

    if (code) {
      setUrlParams({ [CODE_URL_PARAM]: encodeUrlParam(code) });
    } else {
      removeUrlParam(CODE_URL_PARAM);
    }
  }, DEBOUNCE_TIME),
}));
