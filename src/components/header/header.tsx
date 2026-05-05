import { OpenAiButton } from '../openai-button';
import { ShareButton } from '../share-button';

export function Header() {
  return (
    <header className="flex justify-between items-center p-2">
      <div className="flex items-center gap-2">
        <img src="/favicon.png" alt="RunJS" className="size-6" />
        <h1 className="font-bold text-lg">
          Run
          <span className="text-amber-400">JS</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <OpenAiButton />
        <ShareButton />
      </div>
    </header>
  );
}
