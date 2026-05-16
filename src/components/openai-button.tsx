import type { ComponentProps } from 'react';
import { OpenIAIcon } from '@/assets/icons/openia';
import { Button } from '@/components/button';
import { useEditorStore } from '@/store/useEditorStore';
import { getContextPrompt } from '@/utils/ia';

const CHATGPT_QUERY_URL = 'https://chatgpt.com';

type OpenAiButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'disabled' | 'tooltip' | 'children'>;

export function OpenAiButton(props: OpenAiButtonProps) {
  const code = useEditorStore((state) => state.code);

  const openChatGptWithCode = () => {
    const query = getContextPrompt(code);

    const url = `${CHATGPT_QUERY_URL}?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button type="button" onClick={openChatGptWithCode} disabled={!code} tooltip="Open in ChatGPT" {...props}>
      <OpenIAIcon className="size-5" />
    </Button>
  );
}
