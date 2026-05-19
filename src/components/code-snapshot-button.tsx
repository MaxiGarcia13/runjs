import { CaptureIcon } from '@/assets/icons/capture';
import { Tooltip } from './tooltip';

export function CodeSnapshotButton() {
  const url = `${window.location.hostname}/snapshot${window.location.search}`;
  const apiUrl = `https://snap-website-api.vercel.app/website-to-blob-img?url=${url}`;

  return (
    <Tooltip content="Take a snapshot of the code" placement="bottom">
      <a
        className="rounded-md border border-border bg-transparent p-2 hover:bg-surface"
        download="code.png"
        href={apiUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Take a snapshot of the code"
        title="Take a snapshot of the code"
      >
        <CaptureIcon className="h-4 w-4" />
      </a>
    </Tooltip>
  );
}
