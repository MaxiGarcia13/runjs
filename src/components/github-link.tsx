import { cn } from '@maxigarcia/js-utils';
import { GithubIcon } from '@/assets/icons/github';
import { homepage, version } from '../../package.json';

export function GithubLink({ className }: { className?: string }) {
  return (
    <a
      href={homepage}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View repository on GitHub"
      className={cn('flex items-center text-muted transition-colors hover:text-foreground', className)}
    >
      <GithubIcon className="size-4" />

      <span className="mt-1 text-sm">
        v
        {version}
      </span>
    </a>
  );
}
