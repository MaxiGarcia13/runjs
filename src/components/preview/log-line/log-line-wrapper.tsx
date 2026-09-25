import type { CallSite } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { useEditorStore } from '@/store/useEditorStore';
import { CallSiteLink } from './call-site-link';

interface LogLineWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  callSite?: CallSite;
  title?: string;
  icon?: React.ReactNode;
}

export function LogLineWrapper({
  children,
  className,
  callSite,
  title,
  icon,
  ...props
}: LogLineWrapperProps) {
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
      role="listitem"
      aria-label={ariaLabel}
      className={cn(
        'flex w-full items-start gap-2 px-1 py-0.5 text-foreground transition-colors hover:bg-surface/40',
        callSite && 'cursor-pointer',
        className,
      )}
      onMouseEnter={callSite ? handleRevealLine : undefined}
      {...props}
    >
      {callSite
        ? (
            <CallSiteLink callSite={callSite} className="w-8 shrink-0 text-right" />
          )
        : (
            <span className="w-8 shrink-0" aria-hidden />
          )}

      <span className="mt-0.5 flex w-4 shrink-0 justify-center" aria-hidden={!icon}>
        {icon}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {children}
      </div>
    </div>
  );
}
