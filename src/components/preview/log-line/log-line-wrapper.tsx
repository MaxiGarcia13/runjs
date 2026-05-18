import type { CallSite } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { useEditorStore } from '@/store/useEditorStore';

interface LogLineWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  callSite?: CallSite;
}

export function LogLineWrapper({ children, className, callSite, ...props }: LogLineWrapperProps) {
  const requestRevealLine = useEditorStore((state) => state.requestRevealLine);

  const handleRevealLine = () => {
    if (callSite) {
      requestRevealLine(callSite.line);
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-2 w-full rounded-md p-2', className)}
      onMouseOver={handleRevealLine}
      onClick={handleRevealLine}
      {...props}
    >
      {children}
    </div>
  );
}
