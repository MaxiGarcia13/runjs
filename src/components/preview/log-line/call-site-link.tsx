import type { CallSite } from '../types';
import { useEditorStore } from '@/store/useEditorStore';

export function CallSiteLink({ callSite }: { callSite: CallSite }) {
  const { line, column } = callSite;

  const requestRevealLine = useEditorStore((state) => state.requestRevealLine);

  return (
    <button
      type="button"
      className="cursor-pointer self-start text-xs text-gray-400 underline-offset-2 hover:text-gray-200 hover:underline"
      onClick={() => requestRevealLine(line)}
    >
      {`line ${line}, col ${column}`}
    </button>
  );
}
