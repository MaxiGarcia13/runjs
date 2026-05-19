import type { Output } from './types';
import { LogLine } from './log-line';

interface OutputListProps {
  output: Output[];
}

export function OutputList({ output }: OutputListProps) {
  return output
    .map((item) => {
      return (
        <LogLine key={item.id} id={item.id} {...item} />
      );
    });
}
