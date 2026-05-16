import type { ComponentProps } from 'react';
import { LinkIcon } from '@/assets/icons/link';
import { useToast } from '@/components/toast';
import { Button } from './button';

type ShareButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'disabled' | 'tooltip' | 'children'>;

export function ShareButton(props: ShareButtonProps) {
  const { showToast } = useToast();

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);

    showToast('Link copied to clipboard');
  };

  return (
    <Button onClick={handleShare} {...props}>
      <LinkIcon className="size-5" />

      <span>Copy link</span>
    </Button>
  );
}
