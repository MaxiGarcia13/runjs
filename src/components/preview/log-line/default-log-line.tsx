import type { Output } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { LogLineContent } from './log-line-content';
import { LogLineWrapper } from './log-line-wrapper';

export function DefaultLogLine(
  {
    content,
    title,
    callSite,
    type,
  }: Output & { title: string },
) {
  return (
    <LogLineWrapper
      callSite={callSite}
      title={title}
      className={
        cn(
          type === 'log' && 'text-foreground bg-surface/30',
          type === 'warn' && 'text-accent bg-accent/15',
          type === 'error' && 'text-danger bg-danger/15',
          type === 'info' && 'text-info bg-info/15',
          type === 'perf-log' && 'text-purple bg-purple/15',
        )
      }
    >
      <LogLineContent content={content} />
    </LogLineWrapper>
  );
}
