import type { ComponentProps } from 'react';
import { useState } from 'react';
import { CheckIcon } from '@/assets/icons/check';
import { LinkIcon } from '@/assets/icons/link';
import { Button } from './button';

type ShareButtonProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'disabled' | 'tooltip' | 'children'>;

export function ShareButton(props: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setIsCopied(true);
    } finally {
      setTimeout(setIsCopied, 1000, false);
    }
  };

  if (isCopied) {
    return (
      <Button
        {...props}
        tooltip="Link copied to clipboard"
        variant="success"
      >
        <CheckIcon className="size-4" />
      </Button>
    );
  }

  return (
    <Button {...props} onClick={handleShare} tooltip="Copy link">
      <LinkIcon className="size-4" />
    </Button>
  );
}
