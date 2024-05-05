const throttleFunction = (fun, delay = 1000) => {
  let loading = false;
  return (...arg) => {
    if (loading) return;
    loading = true;
    setTimeout(() => {
      fun(...arg);
      loading = false;
    }, delay);
  };
};

export { throttleFunction };
