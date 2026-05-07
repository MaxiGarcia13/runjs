import { HistoryButton } from '../history';
import { NewInstanceButton } from '../new-instance-button';
import { OpenAiButton } from '../openai-button';
import { ShareButton } from '../share-button';

export function Header() {
  return (
    <header className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <img src="/favicon.png" alt="RunJS" className="size-6" />
        <h1 className="text-xl font-bold md:text-2xl">
          Run
          <span className="text-amber-300">JS</span>
        </h1>
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
