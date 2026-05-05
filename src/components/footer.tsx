import { homepage, version } from '../../package.json';

export function Footer() {
  return (
    <footer className="flex justify-center items-center p-2 gap-2 text-xs">
      <span>
        v
        {version}
      </span>
      <span>-</span>
      <a
        href={homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-400 hover:text-pink-300 transition-colors"
      >
        Repository
      </a>
    </footer>
  );
}
