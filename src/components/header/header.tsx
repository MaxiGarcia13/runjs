export function Header() {
  return (
    <header className="flex gap-2 items-center p-2">
      <img src="/favicon.png" alt="RunJS" className="size-6" />
      <h1 className="font-bold text-lg">
        Run
        <span className="text-amber-400">JS</span>
      </h1>
    </header>
  );
}
