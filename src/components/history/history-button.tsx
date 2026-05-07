import { useState } from 'react';
import { HistoryIcon } from '@/assets/icons/history';
import { Button } from '../button';
import { Modal } from '../modal';
import { HistoryList } from './history-list';

export function HistoryButton() {
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

  const handleCloseHistoryModal = () => {
    setOpenHistoryModal(false);
  };

  return (
    <>
      <Button
        tooltip="Open session history"
        onClick={() => setOpenHistoryModal(true)}
      >
        <HistoryIcon className="size-5" />
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
