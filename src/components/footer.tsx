import { homepage, version } from '../../package.json';

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-2 p-2 text-xs">
      <span>
        v
        {version}
      </span>
      <span>-</span>
      <a
        href={homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-400 transition-colors hover:text-pink-300"
      >
        Repository
      </a>
    </footer>
  );
}
