export function EmptyOutput() {
  return (
    <span className="text-green-200">
      Run logs with:
      <br />
      <br />
      log('Hello World');
      <br />
      warn('Hello World');
      <br />
      info('Hello World');
      <br />
      error('Hello World');
      <br />
      <br />
      Measure performance:
      <br />
      perf(heavyTask); or
      {' '}
      {' '}
      {'perf(() => heavyTask(), { label: \'heavyTask\' });'}
      <br />
      <br />
    </span>
  );
}
