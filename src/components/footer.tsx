import { GithubIcon } from '@/assets/icons/github';
import { homepage } from '../../package.json';

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-2 p-2 text-xs">
      <a
        href={homepage}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View repository on GitHub"
        className="flex items-center gap-1 text-gray-400 transition-colors hover:text-gray-300"
      >
        <GithubIcon className="size-4" />
        <span className="mt-1 text-sm">GitHub</span>
      </a>
    </footer>
  );
}
