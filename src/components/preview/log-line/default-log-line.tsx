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
          type === 'log' && 'text-gray-300 bg-gray-700/30',
          type === 'warn' && 'text-amber-300 bg-amber-900/30',
          type === 'error' && 'text-red-400 bg-red-900/30',
          type === 'info' && 'text-cyan-300 bg-cyan-900/30',
          type === 'perf-log' && 'text-blue-300 bg-blue-900/30',
        )
      }
    >
      <LogLineContent content={content} />
    </LogLineWrapper>
  );
}
