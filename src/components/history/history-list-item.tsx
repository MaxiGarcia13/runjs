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

function formatDate(date: number | string) {
  return new Date(date);
}

export function HistoryListItem({ history, onNavigateToHistory }: HistoryListItemProps) {
  const createdAtDate = formatDate(history.createdAt);
  const createdAt = createdAtDate.toLocaleString();

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
      className="flex items-center justify-between gap-2 rounded-md border border-line p-2"
    >
      <div className="flex flex-col gap-2 truncate">
        <Tooltip
          content="Edit history label"
          placement="top"
        >
          <h3
            className="truncate text-sm font-medium"
            role="textbox"
            aria-label="Session label"
            aria-multiline={false}
            onBlur={(e) => handleInputCapture(e.currentTarget.textContent || undefined)}
            contentEditable="plaintext-only"
          >
            {history.label ?? 'Untitled'}
          </h3>
        </Tooltip>
        <span className="text-xs text-muted">
          <span>
            Created at:
            {' '}
          </span>

          <time dateTime={createdAtDate.toISOString()}>
            {createdAt}
          </time>
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Session actions">
        <Button
          onClick={() => remove(history.createdAt)}
          tooltip="Delete session"
          aria-label="Delete session"
        >
          <span aria-hidden><BinIcon className="size-4" /></span>
        </Button>

        <Button onClick={navigateToHistory} aria-label="Open session">
          <span aria-hidden><EyeIcon className="size-4" /></span>
          <span className="hidden md:block">Open session</span>
        </Button>
      </div>
    </li>
  );
}
