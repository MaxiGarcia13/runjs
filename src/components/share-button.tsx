import { ShareIcon } from '@/assets/icons/share';
import { Button } from './button';

export function ShareButton() {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  return (
    <Button onClick={handleShare}>
      <ShareIcon className="size-4" />
      <span>Share</span>
    </Button>
  );
}
