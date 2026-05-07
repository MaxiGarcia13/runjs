import { getUrlParam } from '@maxigarcia/js-utils';
import { PlusIcon } from '@/assets/icons/plus';
import { CODE_URL_PARAM } from '@/constants/url';
import { useEditorStore } from '@/store/useEditorStore';
import { useHistory } from '@/store/useHistory';
import { Button } from './button';

export function NewInstanceButton() {
  const { code, setCode } = useEditorStore();

  const addHistory = useHistory((state) => state.addHistory);

  const handleNewInstance = () => {
    addHistory(getUrlParam(CODE_URL_PARAM));

    setCode('');
  };

  return (
    <Button
      tooltip="Start a new session"
      disabled={!code}
      onClick={handleNewInstance}
    >
      <PlusIcon className="size-5" />
    </Button>
  );
}
