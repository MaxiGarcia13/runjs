export const DEFAULT_VALUE = `
//== Run logs ==
log("Hello World");
warn("Hello World");
info("Hello World");
logTable([{ id: 1, user: { name: "Max" } }, { id: 2, user: { name: "John" } }]);
logTable([10, 22, 32, 42]);

//== Measure performance ==
const heavyTask = () => {};
perf(heavyTask);
perf(() => heavyTask(), { label: 'heavyTask' });

//== Run assertions ==

// primitive assertions
expect(2 + 2).toBe(4);

// async assertions
expect(() => Promise.resolve({ id: 1 })).toEqual({ id: 1 });

// string assertions
expect("Hello World").stringMatching("World");

// object assertions
expect({ id: 1, user: { name: "Max" } }).objectContaining({ user: { name: "Max" } });

// array assertions
expect([{ id: 1 }, { id: 2 }]).arrayContaining([{ id: 2 }]);

// spy assertions
const counter = { value: 0, increment() { this.value += 1; } };
const incrementSpy = spyOn(counter, 'increment');
counter.increment();
counter.increment();
expect(incrementSpy).toHaveBeenCalled();
expect(incrementSpy).toHaveBeenCalledTimes(2);
incrementSpy.mockRestore();
`.trim();
