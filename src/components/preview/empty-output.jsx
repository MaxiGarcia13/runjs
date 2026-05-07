export function EmptyOutput() {
  return (
    <span className="text-green-200">
      Run logs with:
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
      Run assertions:
      <br />
      await expect(2 + 2).toBe(4);
      <br />
      {'expect(() => Promise.resolve({ id: 1 })).toEqual({ id: 1 });'}
      <br />
      <br />
    </span>
  );
}
