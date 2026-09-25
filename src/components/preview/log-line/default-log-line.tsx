import type { Output } from '../types';
import { LogLineContent } from './log-line-content';
import { LogLineIcon } from './log-line-icon';
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
      icon={<LogLineIcon type={type} />}
      {...props}
    >
      <LogLineContent content={content} />
    </LogLineWrapper>
  );
}
