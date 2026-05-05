export function EmptyOutput() {
  return (
    <span className="text-green-300">
      Run log, warn, error, info to see output here.
      <br />
      <br />
      log('Hello World');
      <br />
      warn('Hello World');
      <br />
      error('Hello World');
      <br />
      info('Hello World');
    </span>
  );
}
