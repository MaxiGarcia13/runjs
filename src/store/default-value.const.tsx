export const DEFAULT_VALUE = `
//== Run logs ==
log("Hello World");
warn("Hello World");
info("Hello World");

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
`.trim();
