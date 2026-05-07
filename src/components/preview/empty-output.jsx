export function EmptyOutput() {
  return (
    <span>
      <span className="font-bold text-green-400">
        Run logs with:
      </span>
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
      <span className="font-bold text-green-400">
        Measure performance with:
      </span>
      <br />
      perf(heavyTask);

      <br />
      {'perf(() => heavyTask(), { label: \'heavyTask\' });'}
      <br />
      <br />
      <span className="font-bold text-green-400">
        Run assertions with:
      </span>
      <br />
      expect(2 + 2).toBe(4);
      <br />
      {'expect(() => Promise.resolve({ id: 1 })).toEqual({ id: 1 });'}
      <br />
      <br />
    </span>
  );
}
