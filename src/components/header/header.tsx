import { cn } from '@maxigarcia/js-utils';
import { CodeSnapshotButton } from '../code-snapshot-button';
import { GithubLink } from '../github-link';
import { HistoryButton } from '../history';
import { NewInstanceButton } from '../new-instance-button';
import { OpenAiButton } from '../openai-button';
import { ShareButton } from '../share-button';

export function Header({ className }: { className?: string }) {
  return (
    <header
      role="banner"
      className={cn('flex items-center justify-between gap-2 p-2 sm:flex-row', className)}
      aria-label="RunJS header"
    >
      <div className="flex shrink-0 flex-col items-center sm:flex-row sm:gap-2">
        <div className="flex items-center gap-2">
          <img src="/favicon.webp" alt="RunJS" className="size-6" />
          <h1 className="mt-1 text-xl font-bold sm:text-2xl">
            Run
            <span className="text-accent">JS</span>
          </h1>
        </div>

        <GithubLink className="hidden shrink-0 sm:flex" />
      </div>

      <nav className="flex items-center gap-2" role="toolbar" aria-label="App actions">
        <CodeSnapshotButton />
        <OpenAiButton />
        <HistoryButton />
        <NewInstanceButton />
        <ShareButton />
      </nav>
    </header>
  );
}
