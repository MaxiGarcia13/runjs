import type { CallSite } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { useEditorStore } from '@/store/useEditorStore';

export function CallSiteLink({ callSite, className }: { callSite: CallSite; className?: string }) {
  const { line } = callSite;

  const requestRevealLine = useEditorStore((state) => state.requestRevealLine);

  return (
    <button
      type="button"
      className={cn(
        'cursor-pointer self-start text-gray-400 underline-offset-2 hover:text-gray-200 hover:underline',
        className,
      )}
      onClick={() => requestRevealLine(line)}
    >
      {`line ${line}, col ${1}`}
    </button>
  );
}
