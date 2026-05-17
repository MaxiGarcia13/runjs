import type { ComponentProps } from 'react';
import { getParamFromUrl } from '@maxigarcia/js-utils';
import { PlusIcon } from '@/assets/icons/plus';
import { CODE_URL_PARAM } from '@/constants/url';
import { useEditorStore } from '@/store/useEditorStore';
import { useHistory } from '@/store/useHistory';
import { Button } from './button';

type NewInstanceButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'disabled' | 'tooltip' | 'children'>;

export function NewInstanceButton(props: NewInstanceButtonProps) {
  const { code, setCode } = useEditorStore();

  const addHistory = useHistory((state) => state.addHistory);

  const handleNewInstance = () => {
    addHistory(getParamFromUrl(CODE_URL_PARAM));

    setCode('');
  };

  return (
    <Button
      tooltip="Start a new session"
      disabled={!code}
      onClick={handleNewInstance}
      {...props}
    >
      <PlusIcon className="size-5" />
    </Button>
  );
}
