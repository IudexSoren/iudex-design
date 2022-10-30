export const createNumbersRange = (start: number, end: number): number[] => {
  if (start === end) return [start];

  return [start, ...createNumbersRange(start + 1, end)];
}