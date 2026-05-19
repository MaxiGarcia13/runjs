import type { Output, OutputTestContent, Variant } from '../types';
import { DefaultLogLine } from './default-log-line';
import { LogTableLine } from './log-table';
import { TestLogLine } from './test-log-line';

export function LogLine(props: Output) {
  const logKey: Partial<Record<Variant, string>> = {
    'perf-log': 'PERF',
    'test-log': 'TEST',
    'log-table': 'TABLE',
  };

  const title = logKey[props.type] ?? props.type.toUpperCase();

  if (props.type === 'test-log') {
    const { content, ...rest } = props;

    return (
      <TestLogLine
        {...rest}
        title={title}
        content={content as OutputTestContent}
      />
    );
  }

  if (props.type === 'log-table') {
    const { content, ...rest } = props;

    return (
      <LogTableLine {...rest} title={title} content={content as string} />
    );
  }

  return (
    <DefaultLogLine
      title={title}
      {...props}
    />
  );
}
