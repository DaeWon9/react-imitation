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

export function makeClassName(
  classList: string | (string | undefined)[]
): string {
  if (Array.isArray(classList)) {
    return classList
      .map((className) => {
        if (className === undefined) {
          throw new Error('해당 클래스는 존재하지 않습니다.');
        }
        return className;
      })
      .join(' ');
  } else {
    return classList;
  }
}
