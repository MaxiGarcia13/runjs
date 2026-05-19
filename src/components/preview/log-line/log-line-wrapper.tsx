import type { CallSite } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { useEditorStore } from '@/store/useEditorStore';
import { CallSiteLink } from './call-site-link';

interface LogLineWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  callSite?: CallSite;
  title?: string;
}

export function LogLineWrapper({ children, className, callSite, title, ...props }: LogLineWrapperProps) {
  const requestRevealLine = useEditorStore((state) => state.requestRevealLine);

  const handleRevealLine = () => {
    if (callSite) {
      requestRevealLine(callSite.line);
    }
  };

  const ariaLabel = callSite
    ? `${title}, line ${callSite.line}. Activate to reveal in editor.`
    : title;

  return (
    <div
      role={callSite ? 'button' : 'group'}
      tabIndex={callSite ? 0 : undefined}
      aria-label={ariaLabel}
      className={cn('flex flex-col gap-2 w-full rounded-md justify-between p-2 text-foreground bg-surface/30 cursor-pointer border-l-4', className)}
      onMouseEnter={handleRevealLine}
      onClick={handleRevealLine}
      {...props}
    >
      <span className="shrink-0 text-xs text-muted" aria-hidden>{title}</span>

      <div className="flex flex-1 flex-col gap-2">
        {children}
      </div>

      {callSite && (
        <div className="flex justify-end">
          <CallSiteLink callSite={callSite} className="shrink-0 text-xs" />
        </div>
      )}
    </div>
  );
}
