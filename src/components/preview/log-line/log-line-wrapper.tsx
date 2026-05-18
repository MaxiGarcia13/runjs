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

  return (
    <div
      className={cn('flex flex-col gap-2 w-full rounded-md justify-between p-2 cursor-pointer', className)}
      onMouseEnter={handleRevealLine}
      onClick={handleRevealLine}
      {...props}
    >
      <span className="shrink-0 text-xs">{title}</span>
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
