export default (scope, types) =>
  Object.keys(types).reduce(
    (a, b) => ({ ...a, [b]: `${scope}__${types[b]}` }),
    {}
  );
