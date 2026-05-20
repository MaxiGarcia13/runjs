import type { ComponentProps } from 'react';
import { useState } from 'react';
import { HistoryIcon } from '@/assets/icons/history';
import { Button } from '../button';
import { Modal } from '../modal';
import { HistoryList } from './history-list';

type HistoryButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'disabled' | 'tooltip' | 'children'>;

export function HistoryButton(props: HistoryButtonProps) {
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

  const handleCloseHistoryModal = () => {
    setOpenHistoryModal(false);
  };

  return (
    <>
      <Button
        tooltip="Open session history"
        aria-label="Open session history"
        onClick={() => setOpenHistoryModal(true)}
        {...props}
      >
        <span aria-hidden><HistoryIcon className="size-4" /></span>
      </Button>
      {
        openHistoryModal && (
          <Modal
            open={openHistoryModal}
            title="Session history"
            onClose={handleCloseHistoryModal}
          >
            <HistoryList onNavigateToHistory={handleCloseHistoryModal} />
          </Modal>
        )
      }
    </>
  );
}
