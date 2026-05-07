import type { ReactNode } from 'react';
import type { TooltipCoordinates } from './types';
import { cn } from '@maxigarcia/js-utils';

interface TooltipContentProps {
  content: ReactNode;
  coords: TooltipCoordinates | null;
  contentClassName?: string;
  setTooltipElement: (element: HTMLSpanElement | null) => void;
}

export function TooltipContent({
  content,
  coords,
  contentClassName,
  setTooltipElement,
}: TooltipContentProps) {
  return (
    <span
      ref={setTooltipElement}
      role="tooltip"
      className={cn(
        'pointer-events-none fixed whitespace-nowrap px-2 py-1 text-xs',
        'rounded-md border border-gray-500 bg-gray-700',
        !coords && 'invisible',
        contentClassName,
      )}
      style={{
        top: `${coords?.top ?? 0}px`,
        left: `${coords?.left ?? 0}px`,
      }}
    >
      {content}
    </span>
  );
}
