import type { ComponentProps } from 'react';
import { useHistory } from '@/store/useHistory';
import { HistoryListItem } from './history-list-item';

interface HistoryListProps
  extends Pick<ComponentProps<typeof HistoryListItem>, 'onNavigateToHistory'> {
}

export function HistoryList({ onNavigateToHistory }: HistoryListProps) {
  const histories = useHistory((state) => state.histories);

  return (
    <ul className="flex flex-col gap-2 overflow-auto">
      {
        histories.length > 0
          ? (
              histories.map((history) => (
                <HistoryListItem
                  key={history.createdAt}
                  history={history}
                  onNavigateToHistory={onNavigateToHistory}
                />
              )))
          : (<p className="text-center text-sm text-gray-400">No history found</p>)
      }
    </ul>
  );
}
