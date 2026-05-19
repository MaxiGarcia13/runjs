import type { Output, OutputTestContent } from '../types';
import { LogLineContent } from './log-line-content';
import { LogLineWrapper } from './log-line-wrapper';

export function TestLogLine({
  content,
  title,
  callSite,
}: Omit<Output, 'content'> & {
  title: string;
  content?: OutputTestContent;
}) {
  const { expected, received, isPassed } = content;

  const className = isPassed ? 'text-success bg-success/15' : 'text-danger bg-danger/15';
  const testTitle = isPassed ? `${title} PASSED` : `${title} FAILED`;

  if (!received) {
    return (
      <LogLineWrapper
        callSite={callSite}
        className={className}
        title={testTitle}
      >
        <span>Expected:</span>
        <LogLineContent content={expected} />
      </LogLineWrapper>
    );
  }

  return (
    <LogLineWrapper
      callSite={callSite}
      className={className}
      title={testTitle}
    >
      <span>Received:</span>
      <LogLineContent content={received} />
      <span>Expected:</span>
      <LogLineContent content={expected} />
    </LogLineWrapper>
  );
}
