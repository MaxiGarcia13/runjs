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
    ...props
  }: Output & { title: string },
) {
  return (
    <LogLineWrapper
      callSite={callSite}
      title={title}
      className={
        cn(
          type === 'log' && 'border-surface',
          type === 'warn' && 'border-accent',
          type === 'error' && 'border-danger',
          type === 'info' && 'border-info',
          type === 'perf-log' && 'border-purple',
        )
      }
      {...props}
    >
      <LogLineContent content={content} />
    </LogLineWrapper>
  );
}
