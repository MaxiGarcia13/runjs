import { version } from '../../../package.json';
import { HistoryButton } from '../history';
import { NewInstanceButton } from '../new-instance-button';
import { OpenAiButton } from '../openai-button';
import { ShareButton } from '../share-button';

export function Header() {
  return (
    <header className="flex items-center justify-between gap-2 p-2 sm:flex-row">
      <div className="flex shrink-0 flex-col items-center sm:flex-row sm:gap-2">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="RunJS" className="size-6" />
          <h1 className="mt-1 text-xl font-bold sm:text-2xl">
            Run
            <span className="text-amber-300">JS</span>
          </h1>
        </div>
        <span className="text-xs text-gray-400 sm:mt-1">
          v
          {version}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <OpenAiButton />
        <HistoryButton />
        <NewInstanceButton />
        <ShareButton />
      </div>
    </header>
  );
}
