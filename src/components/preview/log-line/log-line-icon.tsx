import type { Variant } from '../types';
import { cn } from '@maxigarcia/js-utils';
import { AlertSquareRounded } from '@/assets/icons/alert-square-rounded';
import { InfoSquareRounded } from '@/assets/icons/info-square-rounded';
import { PerfIcon } from '@/assets/icons/perf';
import { TestIcon } from '@/assets/icons/test';

interface LogLineIconProps {
  type: Variant;
  isPassed?: boolean;
  className?: string;
}

export function LogLineIcon({ type, isPassed, className }: LogLineIconProps) {
  const iconClassName = cn('size-3.5 shrink-0', className);

  switch (type) {
    case 'error':
      return <AlertSquareRounded className={cn(iconClassName, 'text-danger')} aria-hidden />;
    case 'warn':
      return <AlertSquareRounded className={cn(iconClassName, 'text-accent')} aria-hidden />;
    case 'info':
      return <InfoSquareRounded className={cn(iconClassName, 'text-info')} aria-hidden />;
    case 'perf-log':
      return <PerfIcon className={cn(iconClassName, 'text-highlight')} aria-hidden />;
    case 'test-log':
      return (
        <TestIcon
          className={cn(iconClassName, isPassed ? 'text-success' : 'text-danger')}
          aria-hidden
        />
      );
    default:
      return null;
  }
}
