import { GithubLink } from './github-link';

export function Footer() {
  return (
    <footer
      className="flex items-center justify-center gap-2 p-2 text-xs sm:hidden"
      aria-label="Footer"
    >
      <GithubLink />
    </footer>
  );
}
