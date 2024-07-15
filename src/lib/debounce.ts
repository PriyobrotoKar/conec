export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>

  const debouncedFunc = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }

  return debouncedFunc
}
