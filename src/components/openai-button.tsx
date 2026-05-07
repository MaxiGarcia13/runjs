import { OpenIAIcon } from '@/assets/icons/openia';
import { Button } from '@/components/button';
import { useEditorStore } from '@/store/useEditorStore';
import { getContextPrompt } from '@/utils/ia';

const CHATGPT_QUERY_URL = 'https://chatgpt.com';

export function OpenAiButton() {
  const code = useEditorStore((state) => state.code);

  const openChatGptWithCode = () => {
    const query = getContextPrompt(code);

    const url = `${CHATGPT_QUERY_URL}?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button type="button" onClick={openChatGptWithCode} disabled={!code} tooltip="Open in ChatGPT">
      <OpenIAIcon className="size-5" />
    </Button>
  );
}
