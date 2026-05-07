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
        tooltip="View your history of instances"
        onClick={() => setOpenHistoryModal(true)}
      >
        <HistoryIcon className="size-5" />
      </Button>
      {
        openHistoryModal && (
          <Modal
            open={openHistoryModal}
            title="History of instances"
            onClose={handleCloseHistoryModal}
          >
            <HistoryList onNavigateToHistory={handleCloseHistoryModal} />
          </Modal>
        )
      }
    </>
  );
}
