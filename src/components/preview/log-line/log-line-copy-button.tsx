import type { ComponentProps } from 'react';
import { CheckIcon } from '@/assets/icons/check';
import { CopyIcon } from '@/assets/icons/copy';
import { Button } from '@/components/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { indentStringValue } from '@/utils/value';

interface LogLineCopyButtonProps {
  content: unknown;
  className?: string;
}

export function LogLineCopyButton({ content, className }: LogLineCopyButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    copyToClipboard(() => indentStringValue(content));
  };

  const data: Partial<ComponentProps<typeof Button>> = isCopied
    ? {
        'children': <CheckIcon className="size-3" />,
        'aria-label': 'Copied to clipboard',
        'variant': 'success',
      }
    : {
        'children': <CopyIcon className="size-3" />,
        'aria-label': 'Copy output',
        'variant': 'default',
      };

  return (
    <Button
      className={className}
      onClick={handleCopy}
      aria-label={data['aria-label']}
      variant={data.variant}
    >
      <span aria-hidden>{data.children}</span>
    </Button>
  );
}
