export function debounce(func: Function, timeout?: number) {
  let timer: number | undefined;
  return (...args: any[]) => {
    const next = () => func(...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(next, timeout || 300);
  };
}
