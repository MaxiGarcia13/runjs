import { getUrlParam } from '@maxigarcia/js-utils';
import { PlusIcon } from '@/assets/icons/plus';
import { CODE_URL_PARAM } from '@/constants/url';
import { useEditorStore } from '@/store/useEditorStore';
import { useHistory } from '@/store/useHistory';
import { Button } from './button';

export function NewInstanceButton() {
  const { code, setCode } = useEditorStore();

  const historyPush = useHistory((state) => state.push);

  const handleNewInstance = () => {
    historyPush(getUrlParam(CODE_URL_PARAM));

    setCode('');
  };

  return (
    <Button
      tooltip="Create a new instance"
      disabled={!code}
      onClick={handleNewInstance}
    >
      <PlusIcon className="size-5" />
    </Button>
  );
}
