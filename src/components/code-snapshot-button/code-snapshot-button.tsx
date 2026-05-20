import { useState } from 'react';
import { CaptureIcon } from '@/assets/icons/capture';
import { CaptureOffIcon } from '@/assets/icons/capture-off';
import { LoaderIcon } from '@/assets/icons/loader';
import { useEditorStore } from '@/store/useEditorStore';
import { Button } from '../button';
import { downloadSnapshot, getSnapshotUrl } from './utils';

export function CodeSnapshotButton() {
  const { code } = useEditorStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSnapshot = async () => {
    setIsLoading(true);
    setError(undefined);

    const codeLines = code.split('\n').length;
    const apiUrl = getSnapshotUrl(codeLines);

    try {
      const img = await fetch(apiUrl);
      const blob = await img.blob();

      downloadSnapshot(blob);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while taking the snapshot');

      setTimeout(() => {
        setError(undefined);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      tooltip="Take a snapshot of the code"
      aria-label={error ? 'Snapshot failed' : isLoading ? 'Taking snapshot' : 'Take a snapshot of the code'}
      onClick={handleSnapshot}
    >
      <span aria-hidden>
        {error
          ? <CaptureOffIcon className="size-4 text-red-500" />
          : isLoading
            ? <LoaderIcon className="size-4 animate-spin" />
            : <CaptureIcon className="size-4" />}
      </span>
    </Button>
  );
}
