import type { CallSite } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
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
    <Collapsible
      role="listitem"
      aria-label={ariaLabel}
      className={cn('flex flex-col gap-2 w-full rounded-md justify-between p-2 text-foreground bg-surface/30 border-l-4', callSite && 'cursor-pointer', className)}
      onMouseEnter={callSite ? handleRevealLine : undefined}
      defaultOpen
      {...props}
    >
      <CollapsibleTrigger
        className="text-muted"
        aria-label={`Toggle ${title}`}
      >
        <span className="shrink-0 text-xs">{title}</span>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-1 flex-col gap-2">
        {children}
      </CollapsibleContent>
      {callSite && (
        <div className="flex justify-end">
          <CallSiteLink callSite={callSite} className="shrink-0 text-xs" />
        </div>
      )}

    </Collapsible>
  );
}
