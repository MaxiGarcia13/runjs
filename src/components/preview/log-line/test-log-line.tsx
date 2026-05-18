import type { Output, OutputTestContent } from '../types';
import { CallSiteLink } from './call-site-link';
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
  const { expected, actual, isPassed } = content;

  const className = isPassed ? 'text-green-300 bg-green-900/30' : 'text-red-400 bg-red-900/30';

  return (
    <LogLineWrapper callSite={callSite} className={className}>
      {callSite && (
        <CallSiteLink callSite={callSite} />
      )}

      <span>{`${title}: ${isPassed ? 'passed ✅' : 'failed ❌'}`}</span>

      <span>Expected:</span>
      <LogLineContent content={expected} />
      <span>Received:</span>
      <LogLineContent content={actual} />
    </LogLineWrapper>
  );
}
