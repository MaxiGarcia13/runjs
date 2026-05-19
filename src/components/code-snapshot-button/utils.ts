const SNAPSHOT_LINE_HEIGHT_PX = 24;
const SNAPSHOT_CHROME_HEIGHT_PX = 48 + 2 + 32 + 16;
const SNAPSHOT_MIN_HEIGHT_PX = 600;
const SNAPSHOT_MAX_HEIGHT_PX = 16_000;

export const SNAPSHOT_WIDTH = 1080;
export function getSnapshotHeight(lineCount: number): number {
  const contentHeight = SNAPSHOT_CHROME_HEIGHT_PX + lineCount * SNAPSHOT_LINE_HEIGHT_PX;
  return Math.min(SNAPSHOT_MAX_HEIGHT_PX, Math.max(SNAPSHOT_MIN_HEIGHT_PX, contentHeight));
}

export function getSnapshotUrl(lineCount: number): string {
  const width = SNAPSHOT_WIDTH;
  const height = getSnapshotHeight(lineCount);

  const url = `${window.location.origin}/snapshot${window.location.search}`;
  return `${import.meta.env.VITE_SNAPSHOT_API_URL}/website-to-blob-img?width=${width}&height=${height}&url=${encodeURIComponent(url)}`;
}

export function downloadSnapshot(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'snapshot.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
