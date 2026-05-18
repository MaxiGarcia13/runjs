import type { Output, Variant } from '../types';
import { DefaultLogLine } from './default-log-line';
import { TestLogLine } from './test-log-line';

export function LogLine(props: Output) {
  const logKey: Partial<Record<Variant, string>> = {
    'perf-log': 'PERF',
    'test-log': 'TEST',
  };

  const title = logKey[props.type] ?? props.type.toUpperCase();

  if (
    props.type === 'test-log'
    && props.content
    && typeof props.content === 'object'
  ) {
    const { content, ...rest } = props;

    return (
      <TestLogLine
        {...rest}
        title={title}
        content={content}
      />
    );
  }

  return (
    <DefaultLogLine
      title={title}
      {...props}
    />
  );
}
