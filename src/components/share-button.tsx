import { LinkIcon } from '@/assets/icons/link';
import { useToast } from '@/components/toast';
import { Button } from './button';

export function ShareButton() {
  const { showToast } = useToast();

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);

    showToast('Link copied to clipboard');
  };

  return (
    <Button onClick={handleShare}>
      <LinkIcon className="size-4" />
      <span>Copy link</span>
    </Button>
  );
}
