export function flattenArray<T>(arr: Array<T | T[]>): T[] {
  if (!Array.isArray(arr)) {
    return Array.from(arr);
  }

  return arr.reduce<T[]>(
    (flat, item) =>
      flat.concat(Array.isArray(item) ? flattenArray(item) : item),
    []
  );
}
