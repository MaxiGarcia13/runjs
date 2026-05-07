import type { History } from '@/store/useHistory';
import { debounce, decodeText } from '@maxigarcia/js-utils';
import { BinIcon, EyeIcon } from '@/assets/icons';
import { useEditorStore } from '@/store/useEditorStore';
import { useHistory } from '@/store/useHistory';
import { Button } from '../button';
import { Tooltip } from '../tooltip';

interface HistoryListItemProps {
  history: History;
  onNavigateToHistory: () => void;
}

export function HistoryListItem({ history, onNavigateToHistory }: HistoryListItemProps) {
  const createdAt = new Date(history.createdAt).toLocaleString();

  const remove = useHistory((state) => state.remove);
  const editHistory = useHistory((state) => state.editHistory);
  const setCode = useEditorStore((state) => state.setCode);

  const handleInputCapture = debounce((label: History['label']) => {
    editHistory({
      ...history,
      label,
    });
  }, 300);

  const navigateToHistory = () => {
    setCode(decodeText(history.payload));

    onNavigateToHistory();
  };

  return (
    <li
      key={history.createdAt}
      className="flex items-center justify-between gap-2 rounded-md border border-gray-700 p-2"
    >
      <div className="flex flex-col gap-2 truncate">
        <Tooltip content="Edit history label" position="top">
          <h3
            className="truncate text-sm font-medium"
            onBlur={(e) => handleInputCapture(e.currentTarget.textContent || undefined)}
            contentEditable="plaintext-only"
          >
            {history.label ?? 'Untitled'}
          </h3>
        </Tooltip>
        <span className="text-xs text-gray-400">
          <span>
            Created at:
            {' '}
          </span>

          <time dateTime={createdAt}>
            {createdAt}
          </time>
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          onClick={() => remove(history.createdAt)}
          tooltip="Remove history"
        >
          <BinIcon className="size-4" />
        </Button>

        <Button onClick={navigateToHistory}>
          <EyeIcon className="size-4" />
          <span className="hidden md:block">Go to history</span>
        </Button>
      </div>
    </li>
  );
}
