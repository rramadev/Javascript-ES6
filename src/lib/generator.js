const run = (generator) => {
  const iterator = generator();
  function iterate(iteration) {
    if (iteration.done) return iteration.value;
    const promise = iteration.value;
    return promise.then(x => iterate(iterator.next(x)));
  }
  return iterate(iterator.next());
};

export default run;