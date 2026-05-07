export function EmptyOutput() {
  return (
    <section className="flex flex-col gap-2">
      <Block
        title="Run logs with:"
        examples={
          [
            'log("Hello World");',
            'warn("Hello World");',
            'info("Hello World");',
          ]
        }
      />

      <Block
        title="Measure performance with:"
        examples={
          [
            'perf(heavyTask);',
            'perf(() => heavyTask(), { label: \'heavyTask\' });',
          ]
        }
      />

      <Block
        title="Run assertions with:"
        examples={
          [
            'expect(2 + 2).toBe(4);',
            'expect(() => Promise.resolve({ id: 1 })).toEqual({ id: 1 });',
            'expect("Hello World").stringMatching("World");',
            'expect({ id: 1, user: { name: "Max" } }).objectContaining({ user: { name: "Max" } });',
            'expect([{ id: 1 }, { id: 2 }]).arrayContaining([{ id: 2 }]);',
          ]
        }
      />
    </section>
  );
}

function Block({ title, examples }: { title: string; examples: string[] }) {
  return (
    <div>
      <h2 className="font-bold text-green-400">
        {title}
      </h2>

      {examples.map((example) => (
        <p key={example}>
          {example}
        </p>
      ))}
    </div>
  );
}
