import type { CallSite } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { useEditorStore } from '@/store/useEditorStore';

export function CallSiteLink({ callSite, className }: { callSite: CallSite; className?: string }) {
  const { line } = callSite;

  const requestRevealLine = useEditorStore((state) => state.requestRevealLine);

  return (
    <button
      type="button"
      aria-label={`Go to line ${line}, column 1`}
      className={cn(
        'cursor-pointer self-start text-xs tabular-nums text-muted hover:text-foreground',
        className,
      )}
      onClick={() => requestRevealLine(line)}
    >
      {line}
    </button>
  );
}
