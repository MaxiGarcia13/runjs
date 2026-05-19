import type { Output } from './types';
import { LogLine } from './log-line';

interface OutputsProps {
  outputs: Output[];
}

export function Outputs({ outputs }: OutputsProps) {
  return outputs
    .map((item) => {
      return (
        <LogLine key={item.id} id={item.id} {...item} />
      );
    });
}
